import AccessDenied from "@/components/shared/AccessDenied";

import UpdatePersonName from "../updatePersonForms/UpdatePersonName";
import UpdatePersonEmail from "../updatePersonForms/UpdatePersonEmail";
import UpdatePersonPhoneNumber from "../updatePersonForms/UpdatePersonPhoneNumber";
import UpdateAccountPassword from "../updatePersonForms/UpdateAccountPassword";
import { getCurrentUserPersonalDetails } from "@/server/actions/user.actions";

const UpdatePersonDetails = async () => {
  const userProfile = await getCurrentUserPersonalDetails();

  if (!userProfile) return <AccessDenied />;
  return (
    <section className="flex flex-col gap-8">
      <UpdatePersonName
        firstName={userProfile.firstName}
        lastName={userProfile.lastName}
      />
      <UpdatePersonEmail email={userProfile.email} />
      <UpdatePersonPhoneNumber phoneNumber={userProfile.phoneNumber} />
      <UpdateAccountPassword />
    </section>
  );
};

export default UpdatePersonDetails;
