import React from "react";

const Header = ({ firstName }: { firstName: string }) => {
  return (
    <div>
      <h1 className="mb-0 py-3 font-montserrat text-4xl font-bold max-sm:text-2xl">
        Hi {firstName}!
      </h1>
      <p className="text-xl">Manage your order and account details.</p>
    </div>
  );
};

export default Header;
