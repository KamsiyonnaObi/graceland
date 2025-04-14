import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

const addressSchema = z.object({
  id: z.string().optional(),
  address: z.string(),
  state: z.string(),
  country: z.string(),
  zipCode: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const body = addressSchema.parse(json);

    const address = await prisma.address.create({
      data: {
        ...body,
        userId: user.id,
      },
    });

    return NextResponse.json(address);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 422 });
    }

    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json();
    const body = addressSchema.parse(json);

    if (!body.id) {
      return new NextResponse("Address ID is required", { status: 400 });
    }

    const address = await prisma.address.findUnique({
      where: { id: body.id },
      include: { user: true },
    });

    if (!address?.user?.email || address.user.email !== session.user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const updatedAddress = await prisma.address.update({
      where: { id: body.id },
      data: {
        address: body.address,
        state: body.state,
        country: body.country,
        zipCode: body.zipCode,
      },
    });

    return NextResponse.json(updatedAddress);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse("Invalid request data", { status: 422 });
    }

    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const url = new URL(request.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return new NextResponse("Address ID is required", { status: 400 });
    }

    const address = await prisma.address.findUnique({
      where: { id },
      include: { user: true },
    });

    if (!address?.user?.email || address.user.email !== session.user.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.address.delete({
      where: { id },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const addresses = await prisma.address.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(addresses);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
} 