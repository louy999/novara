import React, { Suspense } from "react";
import MapAllOffers from "../components/searchComponents/MapAllOffers";

const SearchPage = () => {
  const dummyRequests = [
    { id: 1, user_id: 101, date: "2024-12-01", request: "Sample Request 1" },
    { id: 2, user_id: 102, date: "2024-12-02", request: "Sample Request 2" },
  ];

  const dummyTokenData = {
    id: 1,
    access: true,
  };

  return (
    <>
      <div className="relative top-28">
        <Suspense fallback={<div>Loading requests...</div>}>
          <MapAllOffers allRequest={dummyRequests} tokenData={dummyTokenData} />
        </Suspense>
      </div>
    </>
  );
};

export default SearchPage;
