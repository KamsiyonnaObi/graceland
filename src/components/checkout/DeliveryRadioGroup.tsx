"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore } from "@/store/useCartStore";

export function DeliveryRadioGroup() {
  const { setShippingFee } = useCartStore();

  const handleDeliveryRadioGroup = (deliveryOption: string) => {
    if (deliveryOption === "delivery") {
      setShippingFee(150000);
    } else if (deliveryOption === "pick-up") {
      setShippingFee(0);
    }
  };
  return (
    <section className="checkout-card-containers">
      <h2 className="text-lg font-bold">Delivery or Pick Up</h2>
      <RadioGroup
        className="space-y-3"
        defaultValue="pick-up"
        onValueChange={handleDeliveryRadioGroup}
      >
        <div className="flex items-start space-x-3">
          <RadioGroupItem value="pick-up" id="pick-up" />
          <div className="flex flex-col gap-2">
            <Label htmlFor="pick-up">Pick up at store</Label>
            <p className="text-sm">Earliest pick tomorrow 10 AM</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <RadioGroupItem value="delivery" id="delivery" disabled />
          <div className="flex flex-col gap-2">
            <Label htmlFor="delivery">Ship to your address</Label>
            <p className="text-sm">Comming soon</p>
          </div>
        </div>
      </RadioGroup>
    </section>
  );
}
