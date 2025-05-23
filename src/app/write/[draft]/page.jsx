"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Edit from "../Edit";

import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

const Page = () => {
  const params = useParams();
  const [articleData, setArticleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticleData = async () => {
      try {
        setLoading(true);
        const draftId = decodeURIComponent(params.draft);
        const docRef = doc(db, "articles", draftId);
        const data = await getDoc(docRef);
        const docData = { ...data.data(), id: data.id };
        setArticleData(docData);
      } catch (err) {
        setError(err.message || "Failed to load article data");
      } finally {
        setLoading(false);
      }
    };

    if (params.draft) {
      loadArticleData();
    }
  }, [params.draft]);

  if (loading) {
    return (
      <div className="flex flex-col w-full px-[5%] py-20 h-full">
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col w-full px-[5%] py-20 h-full">
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full px-[5%] py-20 h-full">
      <div>
        <Edit saved={true} data={articleData} />
      </div>
    </div>
  );
};

export default Page;
