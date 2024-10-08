import axios from "axios";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const secret = process.env.PAYSTACK_TEST_SECRET_KEY;

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
        metadata: {
          products: formattedProducts,
        },
      },
      { headers: { Authorization: `Bearer ${secret}` } },
    );

    const authorizationUrl = response.data.data.authorization_url;
    return NextResponse.json(
      { checkoutURL: authorizationUrl },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
