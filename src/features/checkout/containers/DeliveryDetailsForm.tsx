"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { DeliveryRadioGroup } from "./DeliveryRadioGroup";
import { useCheckoutForm } from "@/hooks/checkout/useCheckoutForm";
import SelectInputField from "../components/form-fields/SelectInputField";
import { RadioInputField } from "../components/form-fields/RadioInputField";
import { TextInputField } from "../components/form-fields/TextInputField";
import { TextAreaField } from "../components/form-fields/TextAreaField";
import { useCartStore } from "@/store/useCartStore";

const DeliveryDetailsForm = () => {
  const { form, loading, onSubmit } = useCheckoutForm();
  const { isPickUp } = useCartStore();
  return (
    <>
      {/* <DeliveryRadioGroup /> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <section className="checkout-card-containers">
            <h2 className="text-lg font-bold">Delivery Or Pick Up</h2>
            <RadioInputField
              formControl={form.control}
              name="fulfilmentType"
              options={[
                {
                  value: "PICKUP",
                  label: "Pick up at store",
                  subtext: "pick up at our store in Idumota, Lagos",
                },
                {
                  value: "SHIPPING",
                  label: "Ship to your address",
                },
              ]}
            />
          </section>
          <section className="checkout-card-containers">
            {form.watch("fulfilmentType") === "PICKUP" && (
              <>
                <h2 className="text-lg font-bold">Pick up details</h2>
                <RadioInputField
                  formControl={form.control}
                  name="pickUpPerson"
                  label="Pick-up options"
                  options={[
                    {
                      value: "customer",
                      label: "I will collect the order myself",
                    },
                    {
                      value: "someoneElse",
                      label: "Someone else will collect the order for me",
                    },
                  ]}
                />
              </>
            )}
            {/* Ask for name if someone else will pick up order */}
            {form.watch("pickUpPerson") === "someoneElse" && (
              <section className="space-y-4">
                <h3 className="text-base font-bold">
                  Who will pick up this order?
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <TextInputField
                    formControl={form.control}
                    name="pickUpPersonFirstName"
                    label="First Name"
                  />
                  <TextInputField
                    formControl={form.control}
                    name="pickUpPersonLastName"
                    label="Last Name"
                  />
                </div>
              </section>
            )}

            {/* Billing Details */}
            <section className="space-y-4">
              <h3 className="text-base font-bold">Contact Details</h3>

              <div className="grid grid-cols-2 gap-4">
                <TextInputField
                  formControl={form.control}
                  name="billingFirstName"
                  label="First Name"
                />
                <TextInputField
                  formControl={form.control}
                  name="billingLastName"
                  label="Last Name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <TextInputField
                  formControl={form.control}
                  name="email"
                  label="Email"
                />
                <TextInputField
                  formControl={form.control}
                  type="tel"
                  name="phone"
                  label="Phone number"
                  placeholder="803 XXX XXXX"
                  prefix="+234"
                />
              </div>
            </section>
            {form.watch("fulfilmentType") === "SHIPPING" && (
              <section className="space-y-4">
                <h3 className="text-base font-bold">Shipping Details</h3>
                <TextInputField
                  formControl={form.control}
                  name="address"
                  label="Address"
                />
                <div className="grid grid-cols-2 gap-4">
                  <SelectInputField
                    control={form.control}
                    name="state"
                    label="State"
                    options={[{ value: "lagos", label: "Lagos" }]}
                    placeholder="Select a state"
                  />
                  <SelectInputField
                    control={form.control}
                    name="country"
                    label="Country"
                    options={[{ value: "nigeria", label: "Nigeria" }]}
                    placeholder="Select a country"
                  />
                </div>
              </section>
            )}
            <TextAreaField
              formControl={form.control}
              name={"deliveryNote"}
              label="Delivery Instructions"
              placeholder="Include delivery instructions. If you have any"
              description="Your instructions help us deliver your packages to your expectations"
            />

            <Button
              disabled={loading}
              type="submit"
              className="w-full font-bold"
            >
              {loading ? "Please wait..." : "Confirm and Pay"}
            </Button>
            <div className="mx-auto w-full">
              <p className="m-0 w-full text-center text-xs">
                By clicking Confirm and Pay, you agree to our terms and
                conditions. You will be redirected to{" "}
                <span className="font-bold text-tertiary-one">
                  <a href="https://paystack.com/" target="blank">
                    Paystack
                  </a>
                </span>
              </p>
            </div>
          </section>
        </form>
      </Form>
    </>
  );
};

export default DeliveryDetailsForm;
