"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import { auth } from "@/firebase/firebase";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

import {
  collection,
  getDocs,
  where,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";

const page = () => {
  const [user] = useAuthState(auth);
  const author = user?.uid;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const limitAmount = 10;
  const [lastDoc, setLastDoc] = useState(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!author) {
      setData(null);
      return;
    }
    try {
      const q = query(
        collection(db, "articles"),
        where("author", "==", author),
        where("draft", "==", true),
        orderBy("date", "desc"),
        limit(limitAmount)
      );

      getDocs(q).then((querySnapshot) => {
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            title: doc.data().title,
            author: doc.data().author || "Anonymous",
            published: doc.data().date.toDate().toDateString(),
            url: "/write/" + doc.id,
            image: doc.data().cover,
          });
        });
        setData(data);
        setLoading(false);
      });
    } catch (error) {
      setData(null);
      throw new Error(error);
    }
  }, [author]);

  if (loading) {
    return (
      <div className="flex flex-col w-full px-[5%] py-20 h-full">
        <h1 className="text-2xl font-bold mb-4">Drafts</h1>
        <p>Loading...</p>
      </div>
    );
  }

  function loadMore() {
    if (lastDoc) {
      const q = query(
        collection(db, "articles"),
        where("author", "==", author),
        where("draft", "==", true),
        orderBy("date", "desc"),
        limit(limitAmount),
        startAfter(lastDoc)
      );

      getDocs(q).then((querySnapshot) => {
        setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            title: doc.data().title,
            author: doc.data().author || "Anonymous",
            published: doc.data().date?.toDate().toDateString() || "Unknown",
            url: "/write/" + doc.id,
            image: doc.data().cover || null,
          });
        });
        if (data.length < limitAmount) {
          setShow(false);
        }
        setData((prev) => [...prev, ...data]);
      });
    }
  }

  return (
    <div className="flex flex-col w-full px-[5%] py-20 h-full gap-4">
      <h1 className="text-2xl font-bold mb-4">Drafts</h1>
      {data &&
        data.length > 0 &&
        data.map((article, index) => (
          <div key={index + "-" + article.id}>
            <Link href={article.url}>
              <h2>{article.title}</h2>
              <p>{article.published}</p>
            </Link>
          </div>
        ))}
      {show && (
        <Button onClick={loadMore} className={"w-[100px] cursor-pointer"}>
          Load more
        </Button>
      )}
    </div>
  );
};

export default page;
