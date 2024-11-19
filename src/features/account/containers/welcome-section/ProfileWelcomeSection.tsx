import ProfileOrderCard from "../../components/welcome-section/ProfileOrderCard";
import NoOrderCard from "../../components/welcome-section/NoOrderCard";
import Header from "../../components/welcome-section/Header";

import { getUserLatestOrders } from "@/server/actions/user.actions";
import { getUserOrders } from "@/server/actions/order.actions";

const ProfileWelcomeSection = async () => {
  const { userOrders } = await getUserLatestOrders();
  const latestOrder = await getUserOrders({});
  return (
    <section className="mx-auto space-y-8">
      <Header firstName={userOrders?.firstName!} />
      {userOrders?.orders && userOrders.orders.length > 0 ? (
        <div className="space-y-2">
          <h4 className="font-bold">Your latest order: </h4>
          <ProfileOrderCard
            date={userOrders?.orders[0].updatedAt}
            totalPricePaid={userOrders?.orders[0].totalPriceInCents}
            productName={userOrders?.orders[0].orderItems[0].product.name}
            productImgPath={
              userOrders?.orders[0].orderItems[0].product.imagePath
            }
            quantity={userOrders?.orders[0].orderItems[0].quantity}
            trxref={userOrders?.orders[0].trxref}
            totalItems={userOrders?.orders[0].orderItems.length}
          />
        </div>
      ) : (
        <NoOrderCard />
      )}
    </section>
  );
};

export default ProfileWelcomeSection;
