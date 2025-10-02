"use client";

import { Button } from "@/components/ui/button";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  startAfter,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const LoadMoreFeed = ({ lastDoc }) => {
  const [articles, setArticles] = useState([]);
  const [lastDocument, setLastDocument] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(true);

  async function loadMore() {
    if (lastDocument === undefined) {
      setShowLoadMore(false);
      return;
    }

    let temp = lastDocument;
    if (temp === null) {
      const docRef = doc(db, "articles", lastDoc);
      const docSnap = await getDoc(docRef);
      temp = docSnap;
    }
    const q = query(
      collection(db, "articles"),
      where("draft", "==", false),
      orderBy("likeCount", "desc"),
      limit(5),
      startAfter(temp)
    );
    try {
      const data = await getDocs(q);

      const lastVisibleDoc = data.docs[data.docs.length - 1];
      setLastDocument(lastVisibleDoc);
      setArticles((prev) => [
        ...prev,
        ...data.docs.map((doc) => {
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
            likeCount: docdata.likeCount,
            commentCount: docdata.comments?.length || 0,
          };
        }),
      ]);
    } catch (error) {
      throw new Error(error);
    }
  }
  return (
    <>
      <div className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20">
        {articles?.map((post, index) => (
          <Card
            key={post.id + index}
            className="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
          >
            <div className="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12">
              <div className="sm:col-span-5">
                <div className="mb-4 md:mb-6">
                  <div className="flex flex-wrap gap-3 text-xs tracking-wider text-muted-foreground uppercase md:gap-5 lg:gap-6">
                    {post.tags?.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl font-semibold md:text-2xl lg:text-3xl">
                  <Link href={post.url} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-4 text-muted-foreground md:mt-5">
                  {post.summary}
                </p>
                <div className="mt-6 flex items-center space-x-4 text-sm md:mt-8">
                  {/* <span className="text-muted-foreground">
                    {post.likeCount} Likes
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {post.commentCount} Comments
                  </span> */}
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {post.published}
                  </span>
                </div>
                <div className="mt-6 flex items-center space-x-2 md:mt-8">
                  <Link
                    href={post.url}
                    className="inline-flex items-center font-semibold hover:underline md:text-base"
                  >
                    <span>Read more about this post</span>
                    <ArrowRight className="ml-2 size-4 transition-transform" />
                  </Link>
                </div>
              </div>
              <div className="order-first sm:order-last sm:col-span-5">
                <Link href={post.url} className="block">
                  <div className="aspect-[16/9] overflow-clip rounded-lg border border-border">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-opacity duration-200 fade-in hover:opacity-70"
                    />
                  </div>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
      {showLoadMore && (
        <Button variant="ghost" onClick={loadMore}>
          Load More
        </Button>
      )}
    </>
  );
};

export default LoadMoreFeed;
