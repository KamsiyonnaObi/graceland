interface BillingInfoProps {
  shippingAddressId: string | null;
  billingAddress: string;
  billingState: string;
  billingCountry: string;
  billingZip: string | null;
  phoneNumber: string | null;
}

const BillingInfo = ({
  shippingAddressId,
  billingAddress,
  billingState,
  billingCountry,
  billingZip,
  phoneNumber,
}: BillingInfoProps) => {
  return (
    <>
      <div>
        <p className="text-sm font-semibold">Shipping to</p>
        <address className="grid text-sm">
          <span>{billingAddress}</span>
          <span>
            {billingState}, {billingCountry} {billingZip}
          </span>
          <span>{phoneNumber}</span>
        </address>
      </div>
    </>
  );
};

export default BillingInfo;
