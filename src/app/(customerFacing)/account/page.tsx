import ProfilePageCards from "@/components/account/ProfilePageCards";

const AccountPage = () => {
  return (
    <section className="page-container space-y-12">
      <div className="mx-auto w-fit">
        <h1 className="py-3 text-center font-montserrat text-3xl font-bold">
          Welcome, Kamsiyonna!
        </h1>
        <p>View and manage your orders and account details.</p>
      </div>

      <div className="grid max-w-[1170px] grid-cols-3 gap-5">
        <ProfilePageCards
          title="Order History"
          description="Order History"
          href="/account"
        />
        <ProfilePageCards
          title="Profile"
          description="Profile"
          href="/account"
        />
        <ProfilePageCards
          title="Saved Payments"
          description="Saved Payments"
          href="/account"
        />
        <ProfilePageCards
          title="Address Book"
          description="Address Book"
          href="/account"
        />
      </div>
    </section>
  );
};

export default AccountPage;
