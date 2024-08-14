import {
  Hero,
  PopularProducts,
  SuperQuality,
  Services,
  CustomerReviews,
} from "@/components/sections";

export default function HomePage() {
  return (
    <main className="relative">
      <section className="xl:padding-l wide:padding-r padding-b">
        <Hero />
      </section>
      <section className="padding">
        <PopularProducts />
      </section>
      <section id="explore" className="padding">
        <SuperQuality />
      </section>
      <section className="padding-x py-10">
        <Services />
      </section>
      <section id="testimonials" className="padding bg-pale-blue">
        <CustomerReviews />
      </section>
    </main>
  );
}
