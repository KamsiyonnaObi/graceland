"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { DeliveryRadioGroup } from "./DeliveryRadioGroup";
import { useCheckoutForm } from "@/hooks/checkout/useCheckoutForm";
import SelectInputField from "./form-fields/SelectInputField";
import { RadioInputField } from "./form-fields/RadioInputField";
import { TextInputField } from "./form-fields/TextInputField";

const DeliveryDetailsForm = () => {
  const { form, loading, onSubmit } = useCheckoutForm();
  const submitTest = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <DeliveryRadioGroup />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submitTest)}
          className="checkout-card-containers"
        >
          <h2 className="text-lg font-bold">Pick up details</h2>
          <RadioInputField
            formControl={form.control}
            name="pickUpPerson"
            label="Pick-up options"
            options={[
              { value: "customer", label: "I will collect the order myself" },
              {
                value: "someoneElse",
                label: "Someone else will collect the order for me",
              },
            ]}
          />
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
            <h3 className="text-base font-bold">Billing Details</h3>
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
            <TextInputField
              formControl={form.control}
              name="address"
              label="Address"
            />
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
          <Button disabled={loading} type="submit" className="w-full font-bold">
            {loading ? "Please wait..." : "Confirm and Pay"}
          </Button>
          <div className="mx-auto w-full">
            <p className="m-0 w-full text-center text-xs">
              You will be redirected to a secure checkout page. powered by{" "}
              <span className="font-bold text-tertiary-one">
                <a href="https://paystack.com/" target="blank">
                  Paystack
                </a>
              </span>
            </p>
          </div>
        </form>
      </Form>
    </>
  );
};

export default DeliveryDetailsForm;
