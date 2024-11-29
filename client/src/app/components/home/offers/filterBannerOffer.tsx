"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PiBuildingApartment } from "react-icons/pi";
import { TbBuildingStore } from "react-icons/tb";
import { PiBuildingOfficeLight } from "react-icons/pi";

const FilterBannerOffer = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("types");

  return (
    <div className="bg-white w-fit flex gap-5 py-2 px-4 rounded-lg">
      <Link
        className={`hover:bg-info rounded-lg p-2 hover:text-white duration-300 flex justify-center items-center gap-1 ${
          search === "apartment" ? "text-white bg-info" : ""
        }`}
        href="?types=apartment"
      >
        <PiBuildingApartment className="text-xl" />
        <span className="hidden md:block">Apartment</span>
      </Link>
      <Link
        className={`hover:bg-info rounded-lg p-2 hover:text-white duration-300 flex justify-center items-center gap-1 ${
          search === "commercial" ? "text-white bg-info" : ""
        }`}
        href="?types=commercial"
      >
        <TbBuildingStore className="text-xl" />
        <span className="hidden md:block">Commercial</span>
      </Link>
      <Link
        className={`hover:bg-info rounded-lg p-2 hover:text-white duration-300 flex justify-center items-center gap-1 ${
          search === "admin" ? "text-white bg-info" : ""
        }`}
        href="?types=admin"
      >
        <PiBuildingOfficeLight className="text-xl" />
        <span className="hidden md:block">Admin</span>
      </Link>
    </div>
  );
};

export default FilterBannerOffer;
