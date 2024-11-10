import { Button } from "../../../components/ui/button";
import Image from "next/image";

interface ButtonProps {
  label: string;
  iconURL?: string;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  fullWidth?: boolean;
}
const MainButton = ({
  label,
  iconURL,
  backgroundColor,
  textColor,
  fullWidth,
  borderColor,
}: ButtonProps) => {
  return (
    <Button
      className={`flex items-center justify-center gap-2 border px-7 py-4 font-montserrat text-lg leading-none ${
        backgroundColor
          ? `${backgroundColor} ${textColor} ${borderColor}`
          : "border-secondary-one bg-secondary-dark text-white"
      } rounded-full ${fullWidth && "w-full"}`}
    >
      {label}

      {iconURL && (
        <Image
          src={iconURL}
          alt="arrow right icon"
          className="ml-2 h-5 w-5 rounded-full bg-white"
        />
      )}
    </Button>
  );
};

export default MainButton;
