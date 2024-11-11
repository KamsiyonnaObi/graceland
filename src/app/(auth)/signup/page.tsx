import AuthForm from "@/components/auth/AuthForm";
import AuthPageInfoSection from "@/components/auth/AuthPageInfoSection";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";

export type SignUp = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};
const SignUpPage = () => {
  return (
    <section>
      <h1 className="mb-10 text-4xl font-bold">Create Your Account</h1>

      <div className="grid-cols-2 space-y-8 lg:grid lg:space-y-0 lg:px-6">
        <AuthForm type="signup" />
        <Separator className="lg:hidden" />
        <div className="space-y-4">
          <p>Here are some benefits you will enjoy</p>

          <AuthPageInfoSection />
          <p className="mt-2 text-sm">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-secondary-dark underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
