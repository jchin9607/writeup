"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSignOut } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { redirect } from "next/navigation";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "@/firebase/firebase";
import { fetchProfile } from "@/hooks/GetUserData";

const ProfileControl = () => {
  const [signOut, loading, error] = useSignOut(auth);
  const [user, isLoading, isError] = useAuthState(auth);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    if (user !== null) {
      console.log("fetching");
      try {
        // const docRef = doc(db, "users", user.uid);
        // getDoc(docRef).then((docSnap) => {
        //   if (docSnap.exists()) {
        //     const docData = docSnap.data();
        //     setProfilePic(docData.photoURL);
        //   }
        // });
        fetchProfile(user.uid).then((data) => {
          setProfilePic(data.photoURL);
        });
      } catch (error) {
        throw new Error(error);
      }
    }
    if (isError) {
      throw new Error(error);
    }
  }, [user]);
  function handleSignOut() {
    signOut().then(() => {
      redirect("/auth");
    });
  }
  return (
    <>
      {user && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage
                src={profilePic}
                alt="@shadcn"
                className="relative flex size-8 shrink-0 overflow-hidden rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href={"/profile/" + user.uid}>
                <DropdownMenuItem className="cursor-pointer">
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <Link href="/settings">
                <DropdownMenuItem className="cursor-pointer">
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            {/* <DropdownMenuItem disabled>API</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleSignOut()}>
              {loading ? "Signing out..." : "Log out"}
              {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};

export default ProfileControl;
