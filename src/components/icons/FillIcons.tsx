import React from "react";
import { Facebook } from "./fillIcons/Facebook";
import { Google } from "./fillIcons/Google";

interface FillIconProps {
  children?: React.ReactNode;
  className?: string;
}

const FillIcon = ({ children, className }: FillIconProps) => {
  const styles = className || "fill-secondary6 dark:fill-background2 w-6 h-6";
  return (
    <svg
      width="20"
      height="20"
      className={styles}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  );
};

FillIcon.Facebook = ({ className }: FillIconProps) => (
  <FillIcon className={className}>
    <Facebook />
  </FillIcon>
);
FillIcon.Google = ({ className }: FillIconProps) => (
  <FillIcon className={className}>
    <Google />
  </FillIcon>
);

export default FillIcon;
