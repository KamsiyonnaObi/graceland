import Link from "next/link";

const AccessDenied = () => {
  return (
    <div className="py-[72px] lg:py-[152px]">
      <div className="mx-auto w-fit space-y-4">
        <h1 className="text-2xl font-bold">Please sign in to view this page</h1>
        <Link
          className="mt-4 flex justify-center rounded-2xl bg-secondary-one px-10 py-2 font-bold hover:bg-secondary-two"
          href="/login"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;
