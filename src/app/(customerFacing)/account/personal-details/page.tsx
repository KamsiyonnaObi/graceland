import UpdatePersonForm from "@/components/account/updatePersonForms/UpdatePersonForm";
import AccessDenied from "@/components/shared/AccessDenied";

import { getCurrentUserPersonalDetails } from "@/server/actions/user.actions";

const PersonalDetailsPage = async () => {
  const userProfile = await getCurrentUserPersonalDetails();
  if (!userProfile) return <AccessDenied />;
  return (
    <section className="flex flex-col gap-4">
      <div className="header">
        <h3 className="mb-2 text-xl font-bold">Personal Details</h3>
        <p>
          Update your name, phone number, email, and account password at any
          time.
        </p>
      </div>
      <UpdatePersonForm
        firstName={userProfile.firstName}
        lastName={userProfile.lastName}
      />
    </section>
  );
};

export default PersonalDetailsPage;
