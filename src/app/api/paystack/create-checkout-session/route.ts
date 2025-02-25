import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const secret = process.env.PAYSTACK_SECRET_KEY;

  try {
    const { email, amount, products, reference } = await req.json();

    const formattedProducts = products.map((product: any) => ({
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      image: product.image,
    }));

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount,
        reference,
        currency: "NGN",
        callback_url: `${process.env.BASE_URL}/checkout/process-order`,
        subaccount: "ACCT_thy6lr67l5za86n",
        bearer: "subaccount",
        metadata: {
          cancel_action: `${process.env.BASE_URL}/checkout/process-order?reference=${reference}`,
          products: formattedProducts,
        },
      },
      { headers: { Authorization: `Bearer ${secret}` } },
    );

    const { authorization_url, access_code } = response.data.data;
    return NextResponse.json(
      { checkoutURL: authorization_url, checkoutCode: access_code },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
