import AuthForm from "@/components/auth/AuthForm";
import AuthPageInfoSection from "@/components/auth/AuthPageInfoSection";
import { Separator } from "@/components/ui/separator";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export type LogIn = {
  email: string;
  password: string;
};

const LogInPage = () => {
  return (
    <section>
      <h1 className="mb-10 text-4xl font-bold">Sign In</h1>

      <div className="grid-cols-2 space-y-8 lg:grid lg:space-y-0 lg:px-6">
        <AuthForm type="signin" />
        <Separator className="lg:hidden" />
        <div className="space-y-4">
          <h3 className="text-3xl font-bold">Don&apos;t have an account?</h3>
          <p>Here are some benefits you will enjoy</p>

          <AuthPageInfoSection />
          <Link href="/signup">
            <div className="mt-8 flex items-center text-lg font-bold text-secondary-dark hover:underline">
              Create an account <ChevronRight className="inline w-5" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LogInPage;
