"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

import { DeliveryRadioGroup } from "./DeliveryRadioGroup";
import { useCheckoutForm } from "@/hooks/checkout/useCheckoutForm";

const DeliveryDetailsForm = () => {
  const { form, loading, onSubmit } = useCheckoutForm();

  return (
    <>
      <DeliveryRadioGroup />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="checkout-card-containers"
        >
          <h2 className="text-lg font-bold">Pick up details</h2>
          <FormField
            control={form.control}
            name="pickUpPerson"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Pick-up options</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="customer" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        I will collect the order myself
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="someoneElse" />
                      </FormControl>
                      <FormLabel className="font-normal">
                        Someone else will collect the order for me
                      </FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Ask for name if someone else will pick up order */}
          {form.watch("pickUpPerson") === "someoneElse" && (
            <section className="space-y-4">
              <h3 className="text-base font-bold">
                Who will pick up this order?
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="pickUpPersonFirstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pickUpPersonLastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </section>
          )}

          {/* Billing Details */}
          <section className="space-y-4">
            <h3 className="text-base font-bold">Billing Details</h3>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="billingFirstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billingLastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
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
