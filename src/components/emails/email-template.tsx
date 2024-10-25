interface EmailTemplateProps {
  firstName: string;
}

import React from "react";

export const EmailTemplate = ({ firstName }: EmailTemplateProps) => {
  return (
    <div>
      <h1>Hello {firstName}</h1>
    </div>
  );
};
