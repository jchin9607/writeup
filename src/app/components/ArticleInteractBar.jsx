"use client";

import { Heart } from "lucide-react";
import { MessageSquarePlus } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/firebase";
import { redirect } from "next/navigation";
import {
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  increment,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import RefreshData from "@/hooks/RefreshData";
import CommentsButton from "./CommentsButton";
const ArticleInteractBar = ({ data, id }) => {
  const [user, loading, error] = useAuthState(auth);
  const [like, setLike] = useState(false);
  useEffect(() => {
    if (user) {
      setLike(data.likes.includes(user.uid));
    }
  }, [user?.uid]);

  const likes = data?.likeCount;
  const comments = data?.comments?.length;

  async function handleSetLike() {
    try {
      await updateDoc(doc(db, "articles", id), {
        likes: arrayUnion(user.uid),
        likeCount: increment(1),
      });
      RefreshData(id);
    } catch {
      console.log(error);
      throw new Error(error);
    }
  }
  async function handleSetUnLike() {
    try {
      await updateDoc(doc(db, "articles", id), {
        likes: arrayRemove(user.uid),
        likeCount: increment(-1),
      });
      RefreshData(id);
    } catch {
      console.log(error.message);
      throw new Error(error);
    }
  }

  async function handleLike() {
    if (!user) {
      redirect("/auth");
    } else {
      like ? await handleSetUnLike() : await handleSetLike();
      setLike(!like);
    }
  }

  if (loading) {
    return (
      <div className="h-[60px] w-full flex flex-col justify-between mb-8">
        <div className="bg-muted h-[1px]"></div>
        <div className="flex items-center  gap-6">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6" />
            <span className="text-muted-foreground ">{likes || 0}</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquarePlus className="h-6 w-6" />
            <span className="text-muted-foreground">{comments || 0}</span>
          </div>
        </div>

        <div className="bg-muted h-[1px]"></div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="h-[60px] w-full flex flex-col justify-between mb-8">
      <div className="bg-muted h-[1px]"></div>
      <div className="flex items-center  gap-6">
        <div className="flex items-center gap-2">
          {!like && (
            <Heart
              className="h-6 w-6 cursor-pointer dark:fill-white-500"
              onClick={() => handleLike()}
            />
          )}
          {like && (
            <Heart
              className="h-6 w-6 cursor-pointer text-red-500 fill-red-500"
              onClick={() => handleLike()}
            />
          )}
          {/* <span className="text-muted-foreground ">{likes || 0}</span> */}
        </div>
        {/* <div className="flex items-center gap-2">
          <CommentsButton comments={data.comments} user={user} id={id} />

          <span className="text-muted-foreground">{comments || 0}</span>
        </div> */}
      </div>

      <div className="bg-muted h-[1px]"></div>
    </div>
  );
};

export default ArticleInteractBar;
