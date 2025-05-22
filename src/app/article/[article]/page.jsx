"use cache";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import Image from "next/image";
import ArticleInteractBar from "@/app/components/ArticleInteractBar";
import DOMPurify from "isomorphic-dompurify";
import Author from "./Author";
import { unstable_cacheTag as cacheTag } from "next/cache";

const fetchArticleData = async (articleId) => {
  "use cache";

  cacheTag("article", articleId);

  const docRef = doc(db, "articles", articleId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const docData = docSnap.data();

    // Convert Firestore date object to a serializable format
    const date = docData.date.toDate();

    // Return a plain JavaScript object with all data serialized properly
    return {
      ...docData,
      date: date.toDateString(),

      // Handle any other non-serializable fields here if needed
    };
  } else {
    console.log(
      "Document does not exist or you don't have permission to access it."
    );
    throw new Error(
      "Document does not exist or you don't have permission to access it."
    );
  }
};

export default async function page({ params }) {
  const param = await params;
  const articleId = decodeURIComponent(param.article);

  const articleData = await fetchArticleData(articleId);

  const sanitizedContent = DOMPurify.sanitize(articleData.content);

  return (
    <div className=" flex justify-center w-full px-[5%] ">
      <section className="py-20">
        <div className="container">
          <div className="relative flex flex-col justify-between gap-10 ">
            <aside className="top-10 mx-auto h-fit w-full max-w-[65ch] ">
              <Link
                className="mb-5 flex items-center gap-1 text-muted-foreground hover:text-primary"
                href="/home"
              >
                <ChevronLeft className="h-full w-4" />
                Return to home
              </Link>
              <h1 className="mb-5 text-3xl font-bold text-balance lg:text-4xl">
                {articleData.title}
              </h1>

              <Author articleData={articleData} />
            </aside>

            <article className="mx-auto prose w-full">
              <div>
                {/* <img
                  src={articleData.cover}
                  alt="placeholder"
                  className="mt-0 mb-8 aspect-video w-full rounded-lg object-cover"
                /> */}
                <ArticleInteractBar data={articleData} id={articleId} />
                <Image
                  src={`${articleData.cover}`}
                  alt="placeholder"
                  width={1000}
                  height={800}
                  priority
                  loading="eager"
                  placeholder="blur"
                  blurDataURL="/blur.jpg"
                  className="mt-0 mb-8 aspect-video w-full rounded-lg object-cover"
                />
              </div>
              <div
                className="prose prose-sm sm:prose lg:prose-lg dark:prose-invert w-full"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
              ></div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
