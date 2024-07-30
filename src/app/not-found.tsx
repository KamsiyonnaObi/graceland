import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-container flex flex-col space-y-5">
      <div>
        <h1 className="text-3xl font-bold">Not Found</h1>
        <p>Could not find requested resource</p>
      </div>
      <Link
        className="w-fit rounded-full bg-secondary-one p-4 font-bold hover:bg-secondary-two"
        href="/"
      >
        Return Home
      </Link>
    </div>
  );
}
