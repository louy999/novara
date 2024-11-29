"use client";
import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { LuPoundSterling } from "react-icons/lu";
import DeveloperSearchBanner from "../home/bannerSearchHome/developerSearchBanner";
import { useRouter } from "next/navigation";

const FiltrationButton = () => {
  const [showMenu, setShowMenu] = useState(true);
  const [err, setErr] = useState("");
  const [locationInput, setLocationInput] = useState<string>("");
  const [typesInput, setTypesInput] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const router = useRouter();

  const handleReset = () => {
    setLocationInput("");
    setTypesInput("");
    setMinPrice("");
    setMaxPrice("");
    setErr("");
    router.push("/search");
  };

  const formatNumber = (value: string) => {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setPrice: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const value = e.target.value.replace(/,/g, "");
    setPrice(formatNumber(value));
  };

  const buildSearchUrl = () => {
    const params = [];
    if (locationInput) params.push(`location=${locationInput}`);
    if (typesInput) params.push(`types=${typesInput}`);
    if (minPrice) params.push(`down_payment_min=${minPrice.replace(/,/g, "")}`);
    if (maxPrice) params.push(`down_payment_max=${maxPrice.replace(/,/g, "")}`);

    return params.length > 0 ? `/search?${params.join("&")}` : "/search";
  };

  const handleSearch = () => {
    const min = parseInt(minPrice.replace(/,/g, ""), 10);
    const max = parseInt(maxPrice.replace(/,/g, ""), 10);

    if (min && max && min > max) {
      const adjustedMin = min + 50000;
      setErr(
        `Minimum down payment must be less than maximum. Suggested minimum: ${adjustedMin.toLocaleString()}`
      );
      setMinPrice(adjustedMin.toLocaleString());
    } else {
      setErr(""); // Clear the error if inputs are valid
      const searchUrl = buildSearchUrl();
      router.push(searchUrl);
    }
  };

  return (
    <div className="absolute right-0 z-40 flex flex-wrap items-center">
      <div className="relative">
        <button
          className="btn btn-active btn-info text-white"
          onClick={() => setShowMenu((prev) => !prev)}
        >
          Filter
        </button>
        {showMenu ? (
          <div className="animate__backInRight animate__animated animate__faster shadow-xl">
            <div className="fixed -right-4 required:top-20 w-[70vw] md:w-[45vw] lg:w-[25vw] h-fit bg-white rounded-md m-5">
              <div
                className="header p-4 w-full flex justify-between items-center cursor-pointer"
                onClick={() => setShowMenu((prev) => !prev)}
              >
                <div className="text-2xl">Filter</div>
                <IoMdClose className="text-4xl font-bold cursor-pointer hover:rotate-45 duration-300" />
              </div>
              <div className="body px-2 md:px-5 w-full">
                <DeveloperSearchBanner />

                <label className="form-control w-full my-5">
                  <select
                    className="select select-primary"
                    value={locationInput}
                    onChange={(e) => setLocationInput(e.target.value)}
                  >
                    <option disabled selected value="">
                      Dictation
                    </option>
                    <option value="new_cairo">New Cairo</option>
                    <option value="new_capital">New Capital</option>
                    <option value="october">October</option>
                    <option value="zayed">Zayed</option>
                    <option value="new_zayed">New Zayed</option>
                    <option value="north_coast">North Coast</option>
                  </select>
                </label>
                <label className="form-control w-full my-5">
                  <select
                    className="select select-primary"
                    value={typesInput}
                    onChange={(e) => setTypesInput(e.target.value)}
                  >
                    <option disabled selected value="">
                      Type Unit
                    </option>
                    <option value="commercial">Commercial</option>
                    <option value="apartment">Apartment</option>
                    <option value="duplex">Duplex</option>
                    <option value="villa">Villa</option>
                    <option value="chalet">Chalet</option>
                    <option value="admin">Office</option>
                    <option value="clinics">Clinic</option>
                  </select>
                </label>
                <label className="form-control w-full">
                  <input
                    type="text"
                    placeholder="~Minimum Down Payment"
                    className="input input-bordered input-primary w-full"
                    value={minPrice}
                    onChange={(e) => handlePriceChange(e, setMinPrice)}
                  />
                  <div className="label flex justify-start">
                    <span className="label-text-alt">Minimum 800,000</span>
                    <LuPoundSterling />
                  </div>
                </label>
                <label className="form-control w-full">
                  <input
                    type="text"
                    placeholder="~Maximum Down Payment"
                    className="input input-bordered input-primary w-full my-5"
                    value={maxPrice}
                    onChange={(e) => handlePriceChange(e, setMaxPrice)}
                  />
                  <div className="label flex justify-start">
                    {err && (
                      <span className="label-text-alt text-red-500">{err}</span>
                    )}
                  </div>
                </label>
                <div className="flex justify-between mt-5">
                  <button className="btn btn-primary" onClick={handleSearch}>
                    Apply Filters
                  </button>
                  <button className="btn btn-secondary" onClick={handleReset}>
                    Reset Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FiltrationButton;
