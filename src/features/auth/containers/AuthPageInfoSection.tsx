import { accountSignUpBenefits } from "@/constants";

const AuthPageInfoSection = () => {
  return (
    <div className="flex flex-col gap-8 md:flex-row lg:flex-col">
      {accountSignUpBenefits.map((benefit) => (
        <div
          key={benefit.title}
          className="flex items-start gap-4 md:flex-col md:gap-0 lg:flex-row lg:gap-4"
        >
          <benefit.icon />
          <div>
            <p className="font-bold">{benefit.title}</p>
            <p>{benefit.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AuthPageInfoSection;
