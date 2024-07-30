"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { CircleUserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

const UserNavbar = () => {
  const { data: session, status } = useSession();

  return (
    <div className="flex w-fit flex-1 items-center justify-end max-lg:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden border-none bg-transparent"
          >
            <CircleUserRound />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {session?.user && (
            <>
              <DropdownMenuLabel>Hi, {session?.user?.name}</DropdownMenuLabel>
              <DropdownMenuSeparator />
            </>
          )}
          {session?.user ? (
            <>
              <DropdownMenuItem>
                <Link href="/account">Account</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="w-full justify-start border-none"
                >
                  Signout
                </Button>
              </DropdownMenuItem>
            </>
          ) : (
            <Link
              href={"/login"}
              className="font-montserrat text-lg leading-normal text-slate-gray hover:border-none"
            >
              Sign In
            </Link>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserNavbar;
