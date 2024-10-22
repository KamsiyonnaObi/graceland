import React from "react";

const VerifyEmailPage = ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  return (
    <div className="page-container">
      <h1>Hello</h1>
      <p>Your email is verified, here is your token. {searchParams.token}</p>
    </div>
  );
};

export default VerifyEmailPage;
