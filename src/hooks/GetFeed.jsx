import { db } from "@/firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { unstable_cacheTag as cacheTag } from "next/cache";

const GetFeed = async () => {
  "use cache";
  cacheTag("feed");
  const postsCollection = query(
    collection(db, "articles"),
    where("draft", "==", false),
    orderBy("likeCount", "desc"),
    limit(10)
  );

  const data = await getDocs(postsCollection);

  const posts = data.docs.map((doc) => {
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
  });

  return posts;
};

export default GetFeed;
