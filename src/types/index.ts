export interface heroProduct {
  thumbnail: any;
  large: string | StaticImageData;
}

export interface userToken {
  userId: string;
  iat: number;
}

export interface authenticatedUser {
  email?: string;
  name?: string;
  image?: string;
}

export interface OrderDetails {
  totalPriceWithFees: number;
  shippingFee: number;
  taxRate: number;
  taxesPaid: number;
  phoneNumber: string;
  orderEmail: string;
  fulfilmentType: "PICKUP" | "SHIPPING";
  pickUpPersonFirstName?: string;
  pickUpPersonLastName?: string;
  billingFirstName: string;
  billingLastName: string;
  deliveryNote: string;
  paystackCheckoutCode: string; // to initialize paystack checkout session if user did not complete payment
  trxref: string;
}

export interface Address {
  address: string;
  state: string;
  country: string;
}

export interface UserParams {
  email: string;
  confirmEmail: string;
  firstName: string;
  lastName: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
  phoneNumber: string;
  verifiedEmail: boolean;
}
