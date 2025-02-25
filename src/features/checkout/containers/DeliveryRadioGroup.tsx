"use client";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore } from "@/store/useCartStore";

export function DeliveryRadioGroup() {
  const { isPickUp, toggleIsPickUp } = useCartStore();

  const handleDeliveryRadioGroup = (deliveryOption: string) => {
    if (deliveryOption === "delivery") {
      toggleIsPickUp(false);
    } else if (deliveryOption === "pick-up") {
      toggleIsPickUp(true);
    }
  };
  return (
    <section className="checkout-card-containers">
      <h2 className="text-lg font-bold">Delivery or Pick Up</h2>
      <RadioGroup
        className="space-y-3"
        defaultValue={isPickUp ? "pick-up" : "delivery"}
        onValueChange={handleDeliveryRadioGroup}
      >
        <div className="flex items-start space-x-3">
          <RadioGroupItem value="pick-up" id="pick-up" />
          <div className="flex flex-col gap-2">
            <Label htmlFor="pick-up">Pick up at store</Label>
            <p className="text-sm">pick up at our store in Idumota, Lagos</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <RadioGroupItem value="delivery" id="delivery" />
          <div className="flex flex-col gap-2">
            <Label htmlFor="delivery">Ship to your address</Label>
          </div>
        </div>
      </RadioGroup>
    </section>
  );
}
