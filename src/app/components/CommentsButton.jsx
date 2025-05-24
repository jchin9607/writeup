"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { MessageSquarePlus } from "lucide-react";
import { useState } from "react";
import CommentCard from "./CommentCard";
import CommentsInput from "./CommentsInput";
import { Button } from "@/components/ui/button";

const CommentsButton = ({ comments, user, id }) => {
  const [open, setOpen] = useState(false);
  const [maxComments, setMaxComments] = useState(10);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MessageSquarePlus
          className="w-6 h-6 cursor-pointer"
          aria-label="comments"
          role="button"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ">
        <DialogHeader>
          <DialogTitle>Comments</DialogTitle>
        </DialogHeader>
        <DialogDescription>Read all comments</DialogDescription>
        <div className="flex flex-col gap-3 h-50 overflow-y-scroll">
          {open &&
            comments
              ?.slice(0, maxComments)
              .map((comment) => (
                <CommentCard
                  key={comment.comment + comment.author + Math.random()}
                  comment={comment}
                />
              ))}
          {comments?.length > maxComments && (
            <Button
              variant="ghost"
              className="cursor-pointer"
              onClick={() => setMaxComments(maxComments + 10)}
            >
              Load More
            </Button>
          )}
        </div>
        <DialogFooter>
          {user && (
            <>
              <CommentsInput id={id} user={user.uid} />
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsButton;
