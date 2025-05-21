"use server";

import { revalidateTag } from "next/cache";

const RefreshData = async (id) => {
  revalidateTag(id);
};

export default RefreshData;
