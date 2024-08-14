import { Nav, NavLink } from "@/components/Nav";
import UserNavbar from "@/components/Navbar/UserNavbar";
import { Footer } from "@/components/sections";

import { ShoppingCart } from "lucide-react";

export const dynamic = "force-dynamic";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Nav>
        <div className="mx-auto flex w-full max-w-[1170px] items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Graceland</h1>
          </div>
          <div>
            <NavLink href="/">Home</NavLink>
            <NavLink href="#explore">About Us</NavLink>
            <NavLink href="#testimonials">Reviews</NavLink>
            <NavLink href="/products">Shop</NavLink>
          </div>
          <div className="flex">
            <UserNavbar />
            <NavLink href="/cart">
              <ShoppingCart />
            </NavLink>
          </div>
        </div>
      </Nav>
      <div className="">{children}</div>
      <section className="padding-x padding-t bg-black pb-8">
        <Footer />
      </section>
    </>
  );
}
