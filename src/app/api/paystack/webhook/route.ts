import crypto from "crypto";
import { NextResponse, NextRequest } from "next/server";

import { updateOrderStatusAndSavePaymentInfo } from "@/utils/actions/order.actions";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: `Method ${req.method} Not Allowed` },
      { status: 405 },
    );
  }

  try {
    const secret = process.env.PAYSTACK_TEST_SECRET_KEY as string;
    const body = await req.json();
    const { event, data } = body;

    const hash = crypto
      .createHmac("sha512", secret)
      .update(JSON.stringify(body), "utf-8")
      .digest("hex");

    if (hash !== req.headers.get("x-paystack-signature")) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    if (event === "charge.success") {
      await updateOrderStatusAndSavePaymentInfo(data);

      return NextResponse.json({ message: "Success" }, { status: 200 });
    } else {
      // Handle other Paystack events if needed
      console.log("Received Paystack event:", event);
      return NextResponse.json(
        { message: "Event Not Handled" },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error("Error processing Paystack webhook:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
