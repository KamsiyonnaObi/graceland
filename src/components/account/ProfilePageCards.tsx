"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

type ProfilePageCardProps = {
  title: string;
  description: string;
  href: string;
  icon?: any;
};

const ProfilePageCards = ({
  title,
  description,
  href,
  icon,
}: ProfilePageCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardFooter>
        <Button asChild variant="link" className="p-0 text-black">
          <Link href={href}>Manage </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfilePageCards;
