import AccessDenied from "@/components/shared/AccessDenied";

import UpdatePersonName from "../../components/updatePersonForms/UpdatePersonName";
import UpdatePersonEmail from "../../components/updatePersonForms/UpdatePersonEmail";
import UpdatePersonPhoneNumber from "../../components/updatePersonForms/UpdatePersonPhoneNumber";
import UpdateAccountPassword from "../../components/updatePersonForms/UpdateAccountPassword";
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
