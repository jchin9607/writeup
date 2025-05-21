"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SquarePen } from "lucide-react";

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
        <Link href="/write" className="flex items-center hover:underline">
          <SquarePen />
        </Link>
      )}
    </>
  );
};

export default NavbarSignedOut;
