import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(
  req: NextRequest,
  { params }: { params: { reference: string } },
) {
  const { reference } = params;
  const url = `https://api.paystack.co/transaction/verify/${reference}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_TEST_SECRET_KEY}`,
      },
    });
    return NextResponse.json(response.data);
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data || {
      error: "Failed to verify transaction",
    };
    return NextResponse.json(message, { status });
  }
}
