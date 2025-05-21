"use cache";

import { ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import LoadMoreFeed from "./LoadMoreFeed";
import GetFeed from "@/hooks/GetFeed";

export default async function Feed() {
  // const lastDoc = null;
  // const lastDoc = posts[posts.length - 1];

  //   const posts = [
  //     {
  //       id: "post-1",
  //       title: doc.title,
  //       summary:
  //         "Join us for an in-depth exploration of building modern user interfaces using shadcn/ui and React. Learn best practices and advanced techniques.",
  //       label: "Web Design",
  //       author: "Sarah Chen",
  //       published: "15 Feb 2024",
  //       url: "https://shadcnblocks.com",
  //       image: "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
  //       tags: ["Web Design", "UI Development"],
  //     },
  //     {
  //       id: "post-2",
  //       title: "Mastering Tailwind CSS: From Basics to Advanced Techniques",
  //       summary:
  //         "Discover how to leverage the full power of Tailwind CSS to create beautiful, responsive websites with clean and maintainable code.",
  //       label: "Web Design",
  //       author: "Michael Park",
  //       published: "22 Feb 2024",
  //       url: "https://shadcnblocks.com",
  //       image: "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
  //       tags: ["Web Design", "CSS"],
  //     },
  //     {
  //       id: "post-3",
  //       title: "Mastering Tailwind CSS: From Basics to Advanced Techniques",
  //       summary:
  //         "Discover how to leverage the full power of Tailwind CSS to create beautiful, responsive websites with clean and maintainable code.",
  //       label: "Web Design",
  //       author: "Michael Park",
  //       published: "22 Feb 2024",
  //       url: "https://shadcnblocks.com",
  //       image: "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
  //       tags: ["Web Design", "CSS"],
  //     },
  //     {
  //       id: "post-4",
  //       title: "Mastering Tailwind CSS: From Basics to Advanced Techniques",
  //       summary:
  //         "Discover how to leverage the full power of Tailwind CSS to create beautiful, responsive websites with clean and maintainable code.",
  //       label: "Web Design",
  //       author: "Michael Park",
  //       published: "22 Feb 2024",
  //       url: "https://shadcnblocks.com",
  //       image: "https://shadcnblocks.com/images/block/placeholder-dark-1.svg",
  //       tags: ["Web Design", "CSS"],
  //     },
  //   ];

  const posts = await GetFeed();

  return (
    <>
      <div
        className="grid gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20"
        id="feed"
      >
        {posts.map((post) => (
          <Card
            key={post.id}
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
                  <span className="text-muted-foreground">
                    {post.likeCount} Likes
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">
                    {post.commentCount} Comments
                  </span>
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
      <LoadMoreFeed lastDoc={posts[posts.length - 1].id} />
    </>
  );
}
