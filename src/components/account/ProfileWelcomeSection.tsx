import Link from "next/link";
import ProfileOrderCard from "./ProfileOrderCard";
import { getUserLatestOrders } from "@/app/admin/_actions/user.actions";

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
        <>
          <div className="pb-4">
            Thank you for signing up! Take a look at our latest products and
            make your first order!
          </div>
          <Link
            className="w-full rounded-md bg-secondary-one p-3 text-center font-bold hover:bg-opacity-75 active:bg-secondary-dark active:text-white"
            href={"/products"}
          >
            Explore our products
          </Link>
        </>
      )}
    </section>
  );
};

export default ProfileWelcomeSection;
