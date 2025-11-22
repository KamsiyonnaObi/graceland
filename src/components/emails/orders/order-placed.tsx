import React from "react";
import { formatCurrency } from "@/lib/formatters";

interface OrderProps {
  order: {
   fullName: string;
    phoneNumber: string;
    createdAt: Number;
    orderEmail: string;
    trackingNumber: string;
    orderNumber: string;
    trxref: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    imagePath: string;
  }>;
}

export const OrderPlaced: React.FC<OrderProps> = ({ order, items }) => {
  return (
      <div>
        <img
          src="https://gracelandng.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FgracelandLogo.7ac6d2ec.png&w=96&q=75"
          alt="logo"
          width={90}
          height={90}
        />
        <p style={{ fontSize: "16px", fontWeight: "bold" }}>Hi there,</p>
        <p style={{ fontSize: "14px", lineHeight: "20px" }}>
          We&apos;ve received your order. Please complete payment to continue.
        </p>
        <p style={{ fontSize: "16px", fontWeight: "bold" }}> Order Details </p>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Add margin-right to create space */}
          <p style={{ margin: "0 65px 0 0", fontWeight: "bold" }}>
            Pickup Person:
          </p>

          <div>
            <p style={{ margin: "0" }}>
            {order.fullName}
            </p>
            <p style={{ margin: "1" }}> {order.orderEmail}</p>
            <p> {order.phoneNumber}</p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <p style={{ margin: "0 78px 0 0", fontWeight: "bold" }}>
            Pickup Store:
          </p>

          <p style={{ margin: "0" }}>
            {" "}
            43 Oroyinyin Street, Idumota-Lagos, Nigeria
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: "2",
          }}
        >
          <p style={{ margin: "0 42px 0 0", fontWeight: "bold" }}>
            {" "}
            Pickup Documents:{" "}
          </p>
          <p style={{ margin: "0" }}>
            {" "}
            A valid id showing first name and last name.
          </p>
        </div>
        <div
          style={{
            borderBottom: "1px solid #e5e7eb",
            width: "100%",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        ></div>
        <p style={{ fontSize: "16px", fontWeight: "bold" }}> Order Summary </p>
        {items.map((item, index) => (
          <div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <img
                src={item.imagePath}
                alt=""
                width={90}
                height={90}
                style={{ margin: "0 55px 0 20px" }}
              />

              <div>
                <p>{item.name}</p>
                <p>{formatCurrency(item.price)}</p>
                <p> Quantity: {item.quantity}</p>
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            borderBottom: "1px solid #e5e7eb",
            width: "100%",
            marginTop: "50px",
            marginBottom: "50px",
          }}
        ></div>
        <a
          className="underline"
          href={`/checkout/order-success?reference=${order.trxref}`}
        >
          You can view your order summary here
        </a>
        <p>Best,</p> <p>The Graceland Team.</p>
      </div>

  );
};
