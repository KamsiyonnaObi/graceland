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
      {" "}
      {shippingAddressId && (
        <div className="grid gap-3">
          <div className="font-semibold">Shipping Information</div>
          <address className="grid gap-0.5 not-italic text-muted-foreground">
            <span>Liam Johnson</span>
            <span>1234 Main St.</span>
            <span>Anytown, CA 12345</span>
          </address>
        </div>
      )}
      <div className="grid auto-rows-max gap-3">
        <div className="font-semibold">Billing Information</div>
        <address className="grid gap-0.5 not-italic text-muted-foreground">
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
