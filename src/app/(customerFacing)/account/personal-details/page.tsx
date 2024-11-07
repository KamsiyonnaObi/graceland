import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import UpdatePersonDetails from "@/components/account/updatePersonDetails/UpdatePersonDetails";

const PersonalDetailsPage = async ({
  searchParams,
}: {
  searchParams: { type: string };
}) => {
  console.log(searchParams.type);
  return (
    <section className="flex flex-col gap-4">
      <div className="header">
        <h3 className="mb-2 text-xl font-bold">Personal Details</h3>
        <p>
          Update your name, phone number, email, and account password at any
          time.
        </p>
      </div>
      <Suspense fallback={<PersonalDetailsLoader />}>
        <UpdatePersonDetails />
      </Suspense>
    </section>
  );
};

export default PersonalDetailsPage;

function PersonalDetailsLoader() {
  return (
    <div className="flex flex-col gap-8">
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
