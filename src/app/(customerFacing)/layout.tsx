import MobileNav from "@/components/MobileNav";
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
        <div className="mx-auto flex max-w-[1170px] items-center justify-between px-4 sm:px-12 md:px-6 xl:max-w-[1440px]">
          <div>
            <h1 className="text-2xl font-bold">Graceland</h1>
          </div>
          <div className="max-lg:hidden">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/#explore">About us</NavLink>
            <NavLink href="/#testimonials">Reviews</NavLink>
            <NavLink href="/products">Shop</NavLink>
          </div>
          <div className="flex items-center">
            <UserNavbar />
            <NavLink href="/cart">
              <ShoppingCart />
            </NavLink>
            <div className="flex h-10 w-10 items-center justify-center lg:hidden">
              <MobileNav />
            </div>
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
