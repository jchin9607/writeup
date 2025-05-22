import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { unstable_cacheTag as cacheTag } from "next/cache";

const fetchArticleData = async (articleId) => {
  "use cache";

  cacheTag("article", articleId);

  const docRef = doc(db, "articles", articleId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const docData = docSnap.data();

    // Convert Firestore date object to a serializable format

    // Return a plain JavaScript object with all data serialized properly
    return {
      ...docData,
      date: docData.date.toDate().toDateString(),

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

export default fetchArticleData;
