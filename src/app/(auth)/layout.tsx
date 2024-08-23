import { Nav } from "@/components/Nav";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="bg-slate-100">
      <Nav>
        <div className="mx-auto flex max-w-[1170px] items-center justify-between px-4 sm:px-12 md:px-6 xl:max-w-[1440px]">
          <div>
            <h1 className="text-2xl font-bold">Graceland</h1>
          </div>
        </div>
      </Nav>
      <div className="page-container">{children}</div>
    </main>
  );
}
