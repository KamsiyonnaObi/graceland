"use client";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button variant="outline" size="icon" onClick={() => router.back()}>
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
};

export default BackButton;
