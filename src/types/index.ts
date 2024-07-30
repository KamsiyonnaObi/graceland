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
  billingFirstName: string;
  billingLastName: string;
  trxref: string;
}

export interface Address {
  address: string;
  state: string;
  country: string;
}
