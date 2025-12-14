export const metadata = {
  title: "Return Policy - Graceland Nigeria",
  description:
    "Review Graceland Nigeria's return policy for information on returns, exchanges, and refunds.",
  alternates: {
    canonical: "https://www.gracelandng.com/help-center/return-policy",
  },
};
import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="container mx-auto">
      <h1 className="mb-4 text-3xl font-bold">Returns</h1>
      <section className="mb-6 space-y-2">
        <p>
          We have a 30-day return policy, which means you have 30 days after
          receiving your item to request a return.
        </p>

        <p>
          To be eligible for a return, your item must be in the same condition
          that you received it, unworn or unused, with tags, and in its original
          packaging. You&apos;ll also need the receipt or proof of purchase.
        </p>

        <p>
          To start a return, you can contact us at info.gracelandng@gmail.com.
          Please note that returns will need to be sent to the following
          address: <i>43 Oroyinyin Street, Idumota-Lagos, Nigeria</i>
        </p>

        <p>
          If your return is accepted, we&apos;ll send you a return shipping
          label, as well as instructions on how and where to send your package.
          Items sent back to us without first requesting a return will not be
          accepted. Please note that shipping your goods may take longer than
          expected if your country of residence is not Nigeria.
        </p>

        <p>
          You can always contact us for any return questions at
          info.gracelandng@gmail.com.
        </p>
      </section>

      <section className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold">Damages and Issues</h2>
        <p>
          Please inspect your order upon receipt and contact us immediately if
          the item is defective, damaged, or if you receive the wrong item, so
          that we may evaluate the issue and make it right.
        </p>

        <p>
          Certain types of items cannot be returned, like perishable goods (such
          as food, flowers, or plants), custom products (such as special orders
          or personalized items), and personal care goods (such as beauty
          products). We also do not accept returns for hazardous materials,
          flammable liquids, or gases. Please get in touch if you have questions
          or concerns about your specific item.
        </p>

        <p>
          Unfortunately, we cannot accept returns on sale items or gift cards.
        </p>
      </section>

      <section className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold">Exchanges</h2>
        <p>
          The fastest way to ensure you get what you want is to return the item
          you have, and once the return is accepted, make a separate purchase
          for the new item.
        </p>
      </section>

      <section className="mb-6 space-y-2">
        <h2 className="text-xl font-semibold">Refunds</h2>
        <p>
          We will notify you once we’ve received and inspected your return to
          let you know if the refund was approved or not. If approved, you’ll be
          automatically refunded on your original payment method within 10
          business days. Please remember it can take some time for your bank or
          credit card company to process and post the refund too.
        </p>
        <p>
          If more than 15 business days have passed since we’ve approved your
          return, please contact us at info.gracelandng@gmail.com.
        </p>
      </section>
    </div>
  );
};

export default ReturnPolicy;
