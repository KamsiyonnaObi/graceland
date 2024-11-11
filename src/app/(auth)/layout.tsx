import Image from "next/image";
import Link from "next/link";

import { Nav } from "@/components/navbar/Nav";
import { companyLogo } from "../../../public/assets/images";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-slate-100">
      <Nav>
        <div className="mx-auto flex max-w-[1170px] items-center justify-between px-4 sm:px-12 md:px-6 xl:max-w-[1440px]">
          <Link href="/">
            <Image src={companyLogo} alt="logo" width={89} height={29} />
          </Link>
        </div>
      </Nav>
      <div className="page-container">{children}</div>
    </main>
  );
}
