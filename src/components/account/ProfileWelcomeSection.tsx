import { getUserLatestOrders } from "@/app/admin/_actions/user.actions";
import ProfileOrderCard from "./ProfileOrderCard";

const ProfileWelcomeSection = async () => {
  const { userOrders } = await getUserLatestOrders();
  return (
    <section className="mx-auto space-y-8">
      <div>
        <h1 className="mb-0 py-3 font-montserrat text-4xl font-bold">
          Hi {userOrders?.firstName}!
        </h1>
        <p className="text-xl">Manage your order and account details.</p>
      </div>

      <div className="space-y-2">
        <h4 className="font-bold">Your latest order: </h4>
        <ProfileOrderCard
          date={userOrders?.orders[0].updatedAt!}
          totalPricePaid={userOrders?.orders[0].totalPriceInCents!}
          productName={userOrders?.orders[0].orderItems[0].product.name!}
          productImgPath={
            userOrders?.orders[0].orderItems[0].product.imagePath!
          }
          quantity={userOrders?.orders[0].orderItems[0].quantity!}
          trxref={userOrders?.orders[0].trxref!}
          totalItems={userOrders?.orders[0].orderItems.length!}
        />
      </div>
    </section>
  );
};

export default ProfileWelcomeSection;
