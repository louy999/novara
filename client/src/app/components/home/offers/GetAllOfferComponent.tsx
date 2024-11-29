import { Suspense } from "react";
import axios from "axios";
import MapOffers from "./MapOffers";
import FilterBannerOffer from "./filterBannerOffer";
import { BiSolidOffer } from "react-icons/bi";
import AllHotOffers from "../../searchComponents/allHotOffers";

interface dataOffer {
  id: string; // Add this line
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

const GetAllOfferComponent = async () => {
  try {
    const fetchAllOffer = await axios.get(`${process.env.local}/offer`);

    return (
      <div className="relative left-2/4 -translate-x-2/4 rounded-lg bottom-[20vh] lg:bottom-[5vh] bg-black bg-opacity-20  pt-4 px-4 w-full md:w-11/12">
        <div className=" text-black text-4xl pt-3 pl-2 bg-opacity-40 mb-5">
          <div className="flex justify-start gap-1 text-white items-center">
            <BiSolidOffer className="text-error " />
            <span>Hot Offers</span>
          </div>
          <div className="carousel carousel-center  rounded-box w-full space-x-4 p-4  ">
            {fetchAllOffer.data.data.length !== 0 ? (
              fetchAllOffer.data.data
                .filter((offer: dataOffer) => Boolean(offer.status) === true)
                .map((offer: dataOffer, index: number) => (
                  <AllHotOffers key={index} {...offer} />
                ))
            ) : (
              <div className="text-2xl uppercase w-full flex justify-center items-center relative ">
                no found
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <Suspense fallback={<div>Loading...</div>}>
            <FilterBannerOffer />
          </Suspense>
        </div>
        <div className=" flex flex-wrap justify-center mt-10 gap-10">
          {fetchAllOffer.data.data.length !== 0 ? (
            fetchAllOffer.data.data
              .filter((offer: dataOffer) => Boolean(offer.status) === true)
              .map((offer: dataOffer) => (
                <MapOffers key={offer.id} {...offer} />
              ))
          ) : (
            <div className="text-2xl uppercase w-full flex justify-center items-center relative ">
              no found
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};

export default GetAllOfferComponent;
