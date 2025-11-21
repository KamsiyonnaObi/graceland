import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page-container flex flex-col space-y-5">
      <div>
        <h1 className="text-3xl font-bold">Page not found.</h1>
        <p>
          Oops, the page you are trying to view is either not found, the URL is
          incorrect or the page may have moved.
        </p>
        <p>
          If you used a bookmark and received this error, your bookmark may be
          out of date and needs to be replaced. We apologize for any
          inconvenience this may have caused you.
        </p>
        <p className="mt-2 font-semibold">
          To find what you are looking for try the following:
        </p>
        <ul className="ml-6 list-disc">
          <li>
            If you typed the page address in the URL address bar, make sure that
            it is spelled correctly.
          </li>
          <li>
            Return to our{" "}
            <Link className="font-bold text-secondary-two" href="/shop">
              products page
            </Link>{" "}
            and continue browsing.
          </li>
        </ul>
      </div>
    </div>
  );
}
