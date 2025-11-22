"use server";
import { Resend } from "resend";

import { VerifyEmail } from "@/components/emails/auth/verify-email";
import { RecoverPassword } from "@/components/emails/auth/recover-password";
import { OrderConfirmation } from '@/components/emails/orders/order-confirmation';
import { OrderDelivered } from '@/components/emails/orders/order-delivered';
import { OrderPaymentReceived } from '@/components/emails/orders/order-payment-received';
import { OrderPlaced } from '@/components/emails/orders/order-placed';
import { OrderShipped } from '@/components/emails/orders/order-shipped';
import { PickupOrderReady } from '@/components/emails/orders/pickup-order-ready';
import { OrderCancelledPostPayment } from '@/components/emails/orders/order-cancelled-post-payment';
import { OrderCancelledPrePaymentProcessed } from '@/components/emails/orders/order-cancelled-pre-payment-processed';
import { OrderCancelledRefund } from '@/components/emails/orders/order-cancelled-refund';
import { EmailTemplate } from '@/components/emails/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

 export const sendEmail = async ({
  to,
  subject = "Hello from Graceland",
  template = "default",
  data = {}
}: {
  to: string | string[];
  subject?: string;
  template?: string;
  data?: any;
}) => {
  try {
    const templateName = template?.toString().toLowerCase().trim() || 'default';

  let emailComponent;
  switch (templateName) {
    case 'verify-email':
      emailComponent = VerifyEmail({ token: data.token || "default-token" });
      break;
    case 'recover-password':
      emailComponent = RecoverPassword({ token: data.token || "default-token" });
      break;
    case 'order-confirmation':
      emailComponent = OrderConfirmation();
      break;
    case 'order-delivered':
      emailComponent = OrderDelivered();
      break;
    case 'order-payment-received':
      emailComponent = OrderPaymentReceived();
      break;
    case 'order-placed':
      emailComponent = OrderPlaced({order : data.order , items : data.items});
      break;
    case 'order-shipped':
      emailComponent = OrderShipped({order : data.order});
      break;
    case 'pickup-order-ready':
      emailComponent = PickupOrderReady();
      break;
    case 'order-cancelled-post-payment':
      emailComponent = OrderCancelledPostPayment();
      break;
    case 'order-cancelled-pre-payment-processed':
      emailComponent = OrderCancelledPrePaymentProcessed();
      break;
    case 'order-cancelled-refund':
      emailComponent = OrderCancelledRefund({refundAmount : data.refundAmount});
      break;
    default:
      console.error(`Invalid email template: "${template}"`);
      return { success: false, error: `Invalid email template: ${template}` };
  }

  if (!emailComponent) {
    return { success: false, error: `Failed to generate email component for template: ${template}` };
  }

    const { data: result , error } = await resend.emails.send({
      from: "Graceland <no-reply@gracelandng.com>",
      to: Array.isArray(to) ? to : [to],
      subject,
      react: emailComponent,
    });

    if (error) {
      console.log(`Failed to send email to ${to}`, error);
      return { success: false };
    }
    console.log("email sent");
    return { success: true };
  } catch (error) {
    console.log("email not sent");
    return Response.json({ error }, { status: 500 });
  }
}

export const sendEmailVerification = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Graceland <no-reply@gracelandng.com>",
      to: [email],
      subject: "Activate your Graceland account",
      react: VerifyEmail({ token }),
    });

    if (error) {
      console.log(`Failed to send email to ${email}`, error);
      return { success: false };
    }
    console.log("new user created and confirmation email sent");
    return { success: true };
  } catch (error) {
    console.log("confirmation email not sent: ", error);
    return { success: false };
  }
};

export const sendEmailToUser = async ({
  email,
  subject,
  emailComponent,
}: {
  email: string;
  subject: string;
  emailComponent: JSX.Element;
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Graceland <no-reply@gracelandng.com>",
      to: [email],
      subject: subject,
      react: emailComponent,
    });

    if (error) {
      console.log(`Failed to send email to ${email}`, error);
      return { success: false };
    }

    return { success: true };
  } catch (error) {
    console.log("confirmation email not sent: ", error);
    return { success: false };
  }
};
export const sendPasswordResetEmail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  try {
    const { data, error } = await resend.emails.send({
      from: "Graceland <no-reply@gracelandng.com>",
      to: [email],
      subject: "Please reset your password",
      react: RecoverPassword({ token }),
    });

    if (error) {
      console.log(`Failed to send email to ${email}`, error);
      return { success: false };
    }
    console.log("new user created and confirmation email sent");
    return { success: true };
  } catch (error) {
    console.log("confirmation email not sent: ", error);
    return { success: false };
  }
};
