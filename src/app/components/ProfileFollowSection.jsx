"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Loader2 } from "lucide-react";
import { auth } from "@/firebase/firebase";
import { Check } from "lucide-react";
import { redirect } from "next/navigation";
import { updateDoc, doc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import RefreshData from "@/hooks/RefreshData";

const ProfileFollowSection = ({ followers, following, id }) => {
  const [isFollowing, setIsFollowing] = useState(2);

  // 0 = not following
  // 1 = following
  // 2 = user's profile or not logged in

  const [user, loading, error] = useAuthState(auth);

  async function handleSetFollow() {
    try {
      await updateDoc(doc(db, "users", id), {
        followers: arrayUnion(user.uid),
      });
      await updateDoc(doc(db, "users", user.uid), {
        following: arrayUnion(id),
      });
      RefreshData(id);
      RefreshData(user.uid);
      setIsFollowing(1);
    } catch {
      throw new Error(error);
    }
  }

  async function handleRemoveFollow() {
    try {
      await updateDoc(doc(db, "users", id), {
        followers: arrayRemove(user.uid),
      });
      await updateDoc(doc(db, "users", user.uid), {
        following: arrayRemove(id),
      });
      RefreshData(id);
      RefreshData(user.uid);
      setIsFollowing(0);
    } catch {
      throw new Error(error);
    }
  }

  useEffect(() => {
    if (!user) {
      setIsFollowing(2);
    } else if (user.uid === id) {
      setIsFollowing(2);
    } else if (followers.includes(user.uid)) {
      setIsFollowing(1);
    } else if (!followers.includes(user.uid)) {
      setIsFollowing(0);
    }
  }, [user?.uid]);

  if (loading) {
    return (
      <>
        <span>{followers.length} followers</span>
        <span>•</span>
        <span>{following.length} following</span>

        <span>
          <Button variant="outline" size="icon">
            <Loader2 className="animate-spin">
              {/* <Plus />
              <span className="sr-only">Follow</span> */}
            </Loader2>
          </Button>
        </span>
      </>
    );
  }

  if (error) {
    return (
      <>
        <p>Something went wrong</p>
      </>
    );
  }

  async function handleFollowing() {
    if (isFollowing === 2) {
      redirect("/auth");
    }

    if (isFollowing === 0) {
      await handleSetFollow();
    } else if (isFollowing === 1) {
      await handleRemoveFollow();
    }

    // setIsFollowing(isFollowing === 0 ? 1 : 0);
  }

  return (
    <>
      <span>{followers.length} followers</span>
      <span>•</span>
      <span>{following.length} following</span>
      {user?.uid !== id && (
        <span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              handleFollowing();
            }}
            className="cursor-pointer"
          >
            {isFollowing === 0 && <Plus />}
            {isFollowing === 1 && <Check />}
            {isFollowing === 2 && <Plus />}
            <span className="sr-only">
              {isFollowing === 0 || isFollowing === 2 ? "Follow" : "Following"}
            </span>
          </Button>
        </span>
      )}
    </>
  );
};

export default ProfileFollowSection;
