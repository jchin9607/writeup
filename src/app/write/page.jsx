"use server";

import React from "react";
import Edit from "./Edit";
import { connection } from "next/server";

const page = async () => {
  await connection();
  return (
    <div className=" flex flex-col w-full px-[5%] py-20  h-full">
      <div>
        <Edit saved={false} data={null} />
      </div>
    </div>
  );
};

export default page;
