"use server";

import { unstable_cacheTag as cacheTag } from "next/cache";
import { db } from "@/firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export const fetchProfile = async (id) => {
  "use cache";

  cacheTag("profile", id);

  const docRef = doc(db, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    let docData = docSnap.data();
    docData = {
      ...docData,
      lastUpdated: docData.lastUpdated?.seconds * 1000 || null,
    };
    return docData;
  } else {
    console.log(
      "Document does not exist or you don't have permission to access it."
    );
    throw new Error(
      "Document does not exist or you don't have permission to access it."
    );
  }
};
