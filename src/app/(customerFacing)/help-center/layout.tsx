import { HelpCenterSidebar } from "@/features/help-center/components/HelpCenterSidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const helpfulLinks = [
    { href: "/help-center/return-policy", title: "Return Policy" },
    { href: "/help-center/privacy-policy", title: "Privacy Policy" },
    {
      href: "/help-center/terms-and-conditions",
      title: "Terms and Conditions",
    },
  ];

  return (
    <section className="page-container">
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="">
          <HelpCenterSidebar items={helpfulLinks} />
        </aside>
        <section>{children}</section>
      </div>
    </section>
  );
}
