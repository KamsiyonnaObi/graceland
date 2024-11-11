"use server";

import db from "@/server/db/db";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";

import { OrderDetails, Address } from "@/types";
import { PaymentInfo } from "@prisma/client";
import { getCurrentUser } from "./user.actions";
import { orderStatuses } from "@/constants";

import { CartItem } from "@/store/useCartStore";

interface Authorization {
  last4: string;
  card_type: string;
}

interface WebhookData {
  status: string;
  reference: string;
  amount: number;
  requested_amount: number;
  authorization: Authorization;
}

export async function createOrder(
  orderDetails: OrderDetails,
  cartItems: CartItem[],
  billingAddress: Address,
  paymentInfo?: PaymentInfo,
  shippingAddress?: Address,
) {
  const {
    totalPriceWithFees,
    shippingFee,
    taxesPaid,
    taxRate,
    phoneNumber,
    pickUpPersonFirstName,
    pickUpPersonLastName,
    billingFirstName,
    billingLastName,
    trxref,
  } = orderDetails;

  try {
    const createdOrderItems = await Promise.all(
      cartItems.map(async (item) => {
        const product = await db.product.findUnique({
          where: { id: item.id },
        });

        if (!product) {
          throw new Error(`Product with ID ${item.id} not found`);
        }

        return {
          quantity: item.quantity,
          priceInCents: item.price,
          product: { connect: { id: item.id } },
        };
      }),
    );

    const loggedInUserId = await getCurrentUser();
    let createdShippingAddress;
    if (shippingAddress) {
      createdShippingAddress = await db.address.create({
        data: shippingAddress,
      });
    }

    const createdBillingAddress = await db.address.create({
      data: billingAddress,
    });

    const createdOrder = await db.order.create({
      data: {
        totalPriceInCents: totalPriceWithFees,
        shippingFeeInCents: shippingFee,
        pickUpPersonFirstName:
          pickUpPersonFirstName === ""
            ? billingFirstName
            : pickUpPersonFirstName,
        pickUpPersonLastName:
          pickUpPersonLastName === "" ? billingLastName : pickUpPersonLastName,
        phoneNumber,
        taxesPaid,
        taxRate,
        trxref,
        orderItems: { create: createdOrderItems },
        shippingAddress: createdShippingAddress
          ? { connect: { id: createdShippingAddress.id } }
          : undefined,
        user: loggedInUserId
          ? { connect: { id: loggedInUserId.id } }
          : undefined,
        billingAddress: { connect: { id: createdBillingAddress.id } },
      },
    });

    return { createdOrder };
  } catch (error) {
    console.error(error);
  }
}

export async function updateOrderStatusAndSavePaymentInfo(
  webhookData: WebhookData,
) {
  try {
    const {
      status,
      reference: trxref,
      amount,
      requested_amount,
      authorization,
    } = webhookData;

    // Verify customer was charged correct amount
    if (status === "success" && requested_amount === amount) {
      const order = await db.order.findUnique({
        where: { trxref },
      });

      if (!order) {
        throw new Error(`Order with transaction reference ${trxref} not found`);
      }

      // Update the order status to confirmed
      await db.order.update({
        where: { id: order.id },
        data: { status: "confirmed" },
      });

      if (!authorization || !authorization.last4 || !authorization.card_type) {
        throw new Error("Incomplete authorization data");
      }
      // Save the payment info
      await db.paymentInfo.create({
        data: {
          cardNumberLast4: authorization.last4,
          cardType: authorization.card_type,
          Order: {
            connect: {
              id: order.id,
            },
          },
        },
      });

      revalidatePath("/admin/orders");
      console.log("Order confirmed and payment info saved");
      return { ok: true, message: "Order confirmed and payment info saved" };
    } else {
      const order = await db.order.findUnique({
        where: { trxref },
      });

      if (!order) {
        throw new Error(`Order with transaction reference ${trxref} not found`);
      }
      await updateOrderStatus(order.id, "Verify with Paystack");
      throw new Error("Invalid webhook data");
    }
  } catch (error) {
    console.error("Failed to update order and save payment info:", error);
    return {
      ok: false,
      message: "Failed to update order and save payment info",
    };
  }
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
  if (!orderStatuses.includes(newStatus)) {
    return { message: "Invalid Status" };
  }

  // Update the order status in the database
  await db.order.update({
    where: { id: orderId },
    data: { status: newStatus },
  });

  return { message: "success" };
}

export async function getUserOrders({ page }: { page?: number }) {
  const currentUserId = await getCurrentUser();

  if (!currentUserId?.id) {
    return { status: 401, message: "Unauthorized" };
  }
  const resultsPerPage = 5;

  page = Math.max(1, page || 1); // Ensure page is at least 1
  try {
    const skip = (page - 1) * resultsPerPage;
    const totalRecords = await db.order.count({
      where: { userId: currentUserId.id },
    });
    const totalPages = Math.ceil(totalRecords / resultsPerPage);

    const usersOrders = await db.order.findMany({
      where: { userId: currentUserId.id },
      orderBy: { createdAt: "desc" },
      take: resultsPerPage,
      skip,
    });
    return {
      status: 200,
      message: "success",
      orderDetails: usersOrders,
      totalPages,
    };
  } catch (error) {
    console.error(`failed to fetch user orders - ${error}`);
    return { status: 401, message: "Unauthorized" };
  }
}
// Function to update order with transaction reference
export const updateOrderTransactionReference = async (
  orderId: string,
  trxref: string,
) => {
  try {
    const updatedOrder = await db.order.update({
      where: { id: orderId },
      data: { trxref },
    });
    revalidatePath("/admin/orders");
    return updatedOrder;
  } catch (error) {
    console.error("Failed to update order transaction reference:", error);
    throw new Error("Failed to update order transaction reference");
  }
};

export const getOrderByTrxref = async (trxref: string) => {
  try {
    const order = await db.order.findUnique({
      where: { trxref },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        paymentInfo: true,
        billingAddress: true,
      },
    });

    if (!order) {
      throw new Error(`Order with transaction reference ${trxref} not found`);
    }

    return order;
  } catch (error) {
    console.error("Failed to fetch order by trxref:", error);
  }
};

export async function deleteOrder(id: string) {
  const order = await db.order.delete({
    where: { id },
  });

  if (order == null) return notFound();

  return order;
}
