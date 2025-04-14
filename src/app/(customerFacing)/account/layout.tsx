import { Separator } from "@/components/ui/separator";
import { ProfileSidebarNav } from "@/features/account/containers/sidebar/ProfileSidebarNav";
import ProfileWelcomeSection from "@/features/account/containers/welcome-section/ProfileWelcomeSection";

interface ProfileLayoutProps {
  children: React.ReactNode;
}
const sidebarNavItems = [
  {
    title: "Personal Details",
    href: "/account/personal-details",
  },
  {
    title: "Order History",
    href: "/account/order-history",
  },
  {
    title: "Addresses",
    href: "/account/addresses",
  },
];

export default function ProfileLayout({ children }: ProfileLayoutProps) {
  return (
    <section className="page-container">
      <div className="">
        <ProfileWelcomeSection />
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/5">
          <ProfileSidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1">{children}</div>
      </div>
    </section>
  );
}
