"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import RefreshData from "@/hooks/RefreshData";

const CommentsInput = ({ id, user }) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleComment() {
    setLoading(true);
    if (comment === "") {
      setLoading(false);
      return;
    }
    const docRef = doc(db, "articles", id);
    const commentObject = {
      comment: comment,
      author: user,
    };
    try {
      await updateDoc(docRef, {
        comments: arrayUnion(commentObject),
      });
      await RefreshData(id);
      setComment("");
      setLoading(false);
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <>
      <Input value={comment} onChange={(e) => setComment(e.target.value)} />
      <Button onClick={handleComment}>
        {loading ? "Loading..." : "Comment"}
      </Button>
    </>
  );
};

export default CommentsInput;
