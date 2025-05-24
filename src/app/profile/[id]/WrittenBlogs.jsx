"use cache";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import ProfileToggleSection from "@/components/profile-toggle-section";
import {
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy,
} from "firebase/firestore";
import { db } from "@/firebase/firebase";
import LoadMore from "./LoadMore";

export const fetchBlogs = async (id) => {
  "use cache";
  const docsRef = query(
    collection(db, "articles"),
    where("author", "==", id),
    where("draft", "==", false),
    orderBy("date", "desc"),
    limit(10)
  );

  const docSnap = await getDocs(docsRef);

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
  return data;
};

const WrittenBlogs = async ({ id }) => {
  const blogs = await fetchBlogs(id);

  if (blogs.length === 0) {
    return null;
  }

  return (
    <ProfileToggleSection title="Written Blogs">
      <div className="space-y-6">
        {blogs.map((blog) => (
          <div
            className="bg-white dark:bg-[#262626] p-5 rounded-lg border border-[#e6e6e6] dark:border-[#333]"
            key={blog.id}
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
        <LoadMore article={blogs[blogs.length - 1].id} id={id} />
      </div>
    </ProfileToggleSection>
  );
};

export default WrittenBlogs;
