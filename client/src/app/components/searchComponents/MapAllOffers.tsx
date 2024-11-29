"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import MapOffers from "../home/offers/MapOffers";
import AllLaunches from "./allLaunches";
import FiltrationButton from "./filtrationButton";

interface DataOffer {
  id: string;
  developer_id: string;
  image_offer: string;
  furniture: string;
  bed: string;
  bath: string;
  down_payment: string;
  types: string;
  location: string;
  installment: string;
  areas: string;
  status: boolean;
  cat: string;
}

const MapAllOffers = () => {
  const searchParams = useSearchParams();
  const [dataOffer, setDataOffer] = useState<DataOffer[]>([]);
  const searchTypes = searchParams.get("types");
  const searchLocation = searchParams.get("location");
  const searchDownMin = searchParams.get("down_payment_min");
  const searchDownMax = searchParams.get("down_payment_max");

  useEffect(() => {
    const getAllOffersFetch = async () => {
      try {
        const res = await axios.get(`${process.env.local}/offer`);
        setDataOffer(res.data.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };
    getAllOffersFetch();
  }, []);
  const filteredOffers = dataOffer.filter((offer) => {
    console.log(
      Number(searchDownMin) <= Number(offer.down_payment) &&
        Number(offer.down_payment) <= Number(searchDownMax)
    );

    return (
      offer.status === true &&
      (!searchTypes || offer.types === searchTypes) &&
      (!searchLocation || offer.location.includes(searchLocation)) &&
      (!searchDownMin || Number(searchDownMin) <= Number(offer.down_payment)) &&
      (!searchDownMax || Number(searchDownMax) >= Number(offer.down_payment))
    );
  });

  return (
    <div className="relative top-28 overflow-x-hidden">
      <div className="bg-neutral text-white text-4xl pt-3 pl-2 bg-opacity-40 mb-5">
        <div>New Launches</div>
        <div className="carousel carousel-center rounded-box w-full space-x-4 p-4">
          {dataOffer.length ? (
            dataOffer
              .filter((offer) => offer.cat === "Launches")
              .map((offer, index) => <AllLaunches key={index} {...offer} />)
          ) : (
            <div className="text-2xl uppercase w-full flex justify-center items-center">
              No Found
            </div>
          )}
        </div>
      </div>
      <div className="relative bg-info bg-opacity-15 pt-10">
        <FiltrationButton />
        <div className="flex flex-wrap justify-center mt-10 gap-10">
          {filteredOffers.length ? (
            filteredOffers.map((offer, index) => (
              <MapOffers key={index} {...offer} />
            ))
          ) : (
            <div className="text-2xl uppercase w-full flex justify-center items-center min-h-screen h-full">
              No Found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapAllOffers;
