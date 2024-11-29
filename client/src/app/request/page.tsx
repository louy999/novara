/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import AddRequest from "../components/request/addRequest";
import AllRequestComponents from "../components/request/allRequestComponents";
import axios from "axios";
import { headers } from "next/headers";

const page = async () => {
  const headersList = await headers();
  const userAgent = headersList.get("x-user-id");

  try {
    const getAllRequest = await axios.get(`${process.env.local}/req`);
    const tokenData = userAgent ? JSON.parse(userAgent) : null; // Handle null case

    return (
      <div className="w-full flex justify-center relative top-28 flex-wrap h-full">
        <AddRequest tokenData={tokenData} />
        <AllRequestComponents
          tokenData={tokenData}
          allRequest={getAllRequest.data.data}
        />
      </div>
    );
  } catch (error: any) {
    return (
      <div className="w-full flex justify-center relative top-28 flex-wrap">
        <AddRequest />
        <div>{error.message || "An error occurred"}</div>
      </div>
    );
  }
};

export default page;
