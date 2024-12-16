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
  pickUpPersonFirstName: string | undefined;
  pickUpPersonLastName: string | undefined;
  billingFirstName: string;
  billingLastName: string;
  deliveryNote: string;
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
