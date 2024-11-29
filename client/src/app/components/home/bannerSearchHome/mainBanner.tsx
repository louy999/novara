"use client";
import React, { useState } from "react";
import DeveloperSearchBanner from "./developerSearchBanner";
import LocationSearchBanner from "./locationSearchBanner";
import TypesUnitsSearchBanner from "./TypesUnitsSearchBanner";
import PriceSearchBanner from "./priceSearchBanner";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";

const MainBanner = () => {
  const [locationInput, setLocationInput] = useState("");
  const [typesInput, setTypesInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  const buildSearchUrl = () => {
    const params = [];
    if (locationInput) params.push(`location=${locationInput}`);
    if (typesInput) params.push(`types=${typesInput}`);
    if (priceInput) {
      const [minPrice, maxPrice] = priceInput
        .split(",")
        .map((val) => parseInt(val.trim()));
      params.push(`down_payment_min=${minPrice}&down_payment_max=${maxPrice}`);
    }

    return params.length > 0 ? `/search?${params.join("&")}` : null;
  };

  const searchUrl = buildSearchUrl();

  return (
    <div className=" relative bottom-[30vh] left-2/4 -translate-x-2/4 bg-white z-20 p-2 w-10/12 md:w-8/12 lg:min-w-fit lg:w-9/12 rounded-lg">
      <h1 className="font-bold text-3xl mb-3">Find Your New Home...</h1>
      <div className="flex flex-wrap lg:flex-nowrap gap-5">
        <DeveloperSearchBanner />
        <LocationSearchBanner
          changeSet={setLocationInput}
          valueSet={locationInput}
        />
        <TypesUnitsSearchBanner
          changeSet={setTypesInput}
          valueSet={typesInput}
        />
        <PriceSearchBanner changeSet={setPriceInput} valueSet={priceInput} />
        {searchUrl ? (
          <Link
            href={searchUrl}
            className="w-fit btn btn-info text-white text-xl"
          >
            <FaSearch /> Search
          </Link>
        ) : (
          <button
            className="w-fit btn btn-info text-white text-xl opacity-50 cursor-not-allowed"
            disabled
          >
            <FaSearch /> Search
          </button>
        )}
      </div>
    </div>
  );
};

export default MainBanner;
