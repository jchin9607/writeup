"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { useState } from "react";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const LoadMore = ({ article, id }) => {
  const [lastDoc, setLastDoc] = useState(null);
  const [articles, setArticles] = useState([]);
  async function handleLoadMore() {
    try {
      let temp = lastDoc;
      if (temp === null) {
        const docRef = doc(db, "articles", article);
        const docSnap = await getDoc(docRef);
        temp = docSnap;
      }

      const q = query(
        collection(db, "articles"),
        where("author", "==", id),
        where("draft", "==", false),
        orderBy("date", "desc"),
        limit(10),
        startAfter(temp)
      );

      const docSnap = await getDocs(q);
      const data = docSnap.docs.map((doc) => {
        const docdata = doc.data();
        return {
          id: doc.id,
          title: docdata.title,
          summary: docdata.description,
          author: docdata.author || "Anonymous",
          published: docdata.date.toDate().toDateString(),
          url: "/article/" + doc.id,
          image: docdata.cover,
          tags: docdata.tags,
        };
      });
      setLastDoc(docSnap?.docs[docSnap.docs.length - 1]);

      setArticles((prev) => [...prev, ...data]);
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
  return (
    <>
      {articles.map((blog, index) => (
        <div
          className="bg-white dark:bg-[#262626] p-5 rounded-lg border border-[#e6e6e6] dark:border-[#333]"
          key={index}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg">{blog.title}</h3>
            <p className="text-sm text-[#6b7280] dark:text-[#a8a29e]">
              {blog.published}
            </p>
          </div>
          <p className="text-[#37352f] dark:text-[#e6e6e6] mb-3">
            {blog.summary}
          </p>
          <div className="flex flex-wrap gap-2">
            {blog.tags.map((tag) => (
              <Badge
                variant="outline"
                className="bg-white dark:bg-[#262626]"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-3">
            <Link
              href={"/article/" + blog.id}
              className="text-sm text-[#6b7280] hover:text-[#37352f] dark:text-[#a8a29e] dark:hover:text-[#e6e6e6] transition-colors"
            >
              Read more →
            </Link>
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <Button variant={"ghost"} onClick={handleLoadMore}>
          Load More
        </Button>
      </div>
    </>
  );
};

export default LoadMore;
