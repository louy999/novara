"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import MapRequest from "./MapRequest";
interface Request {
  id: number;
  user_id: number;
  date: string;
  request: string;
}
interface TokenDataType {
  id: string | number;
  access: boolean;
}
const AllRequestComponents: React.FC<{
  allRequest: Request[];
  tokenData: TokenDataType;
}> = ({ allRequest, tokenData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedRequests, setDisplayedRequests] = useState<Request[]>([]);
  const itemsPerPage = 10;

  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const page = parseInt(searchParams?.get("page") || "1", 10);
    setCurrentPage(page);

    const sortedRequests = allRequest.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayedRequests(sortedRequests.slice(startIndex, endIndex));
  }, [searchParams, allRequest]);

  const totalPages = Math.ceil(allRequest.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page !== currentPage) {
      router.push(`/request?page=${page}`);
    }
  };

  const renderPagination = () => {
    const pages: JSX.Element[] = [];
    let dotsAdded = false; // Track whether dots have already been added

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`join-item btn mb-10 ${
              i === currentPage ? "btn-primary" : ""
            }`}
          >
            {i}
          </button>
        );
      } else if (
        (i === currentPage - 2 || i === currentPage + 2) &&
        !dotsAdded
      ) {
        pages.push(
          <button key={`dots-${i}`} className="join-item btn btn-disabled">
            ...
          </button>
        );
        dotsAdded = true; // Mark that dots have been added
      }
    }

    return pages;
  };

  return (
    <div className="w-full relative top-10 flex flex-col items-center gap-5 bg-gradient-to-r from-[#e6e9f0] to-[#eef1f5] h-full mb-10">
      {displayedRequests.map((r, a) => (
        <MapRequest key={a} data={r} tokenData={tokenData} />
      ))}
      <div className="join mt-5">{renderPagination()}</div>
    </div>
  );
};

export default AllRequestComponents;
