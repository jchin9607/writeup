"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SquarePen } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const NavbarSignedOut = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      {!user && (
        <Button asChild>
          <Link href="/auth" className="flex items-center hover:underline">
            Log In
          </Link>
        </Button>
      )}
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SquarePen
              className="cursor-pointer"
              aria-label="open write options menu"
              role="button"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Write</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/drafts" prefetch={false}>
                <DropdownMenuItem className="cursor-pointer">
                  Drafts
                </DropdownMenuItem>
              </Link>

              <Link
                href="/write"
                // className="flex items-center hover:underline"
                prefetch={false}
              >
                <DropdownMenuItem className="cursor-pointer">
                  New Writeup
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default NavbarSignedOut;
