"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchProfile } from "@/hooks/GetUserData";
import { useMemo } from "react";

const CommentCard = ({ comment }) => {
  const [author, setAuthor] = useState(null);
  useEffect(() => {
    try {
      fetchProfile(comment.author).then((data) => setAuthor(data));
    } catch (error) {
      throw new Error(error);
    }
  }, []);

  const memorizedCard = useMemo(() => {
    return (
      <div className="flex gap-3 items-center">
        <div>
          <Link href={"/profile/" + comment.author}>
            <Avatar className="size-7 rounded-full">
              <AvatarImage
                src={author?.photoURL}
                alt="placeholder"
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </div>
        <div>
          <Link href={"/profile/" + comment.author}>
            <p className="font-semibold">{author?.fullName}</p>
          </Link>
          <p>{comment.comment}</p>
        </div>
      </div>
    );
  });

  return memorizedCard;
};

export default CommentCard;
