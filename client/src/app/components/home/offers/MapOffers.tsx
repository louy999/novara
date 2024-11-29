"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { IoLogoWhatsapp } from "react-icons/io";
import { TbMeterSquare } from "react-icons/tb";
import { RiCommunityLine } from "react-icons/ri";
import { LuPoundSterling, LuBedDouble } from "react-icons/lu";
import { FaBath } from "react-icons/fa";
import Link from "next/link";

interface DataOffer {
  id: string;
  image_offer: string;
  down_payment: string;
  types: string;
  location: string;
  installment: string;
  areas: string;
  bath?: string;
  bed?: string;
}

const MapOffers: React.FC<DataOffer> = ({
  id,
  image_offer,
  down_payment,
  types,
  location,
  installment,
  areas,
  bath,
  bed,
}) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("types");

  return (
    <div
      className={`card bg-base-100 shadow-2xl relative ${
        !search || search === types ? "" : "hidden"
      }`}
    >
      <figure>
        <Image
          src={`${process.env.img}/image/${image_offer}`}
          width={500}
          height={500}
          alt="Offer Image"
        />
      </figure>
      <div className="absolute top-3 right-4 bg-info text-white rounded-lg p-2 capitalize">
        {location}
      </div>
      <div className="card-body">
        <div className="flex justify-between gap-2">
          <div className="w-full text-white py-2 text-center bg-primary rounded-lg text-xl flex justify-center items-center">
            {areas} <TbMeterSquare className="text-2xl" />
          </div>
          <div className="w-full text-white py-2 text-center bg-info rounded-lg capitalize flex justify-center items-center">
            <RiCommunityLine /> {types}
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="w-full relative text-black py-2 text-center border-2 border-primary rounded-lg text-xl flex justify-center items-center">
            <span className="absolute px-1 -top-2 left-2 text-xs bg-[#fff]">
              Down Payment
            </span>
            {parseInt(down_payment).toLocaleString("en-US")}
            <LuPoundSterling className="text-xl" />
          </div>
          <div className="w-full relative text-black py-2 text-center border-2 border-info rounded-lg capitalize flex justify-center items-center">
            <span className="absolute px-1 -top-2 left-2 text-xs bg-[#fff]">
              Installment
            </span>
            {installment}
          </div>
        </div>
        {(bed || bath) && (
          <div className="flex justify-between gap-2">
            {bed && (
              <div className="w-full relative text-black py-2 text-center border-2 border-primary rounded-lg text-xl flex justify-center items-center">
                <span className="absolute px-1 -top-2 left-2 text-xs bg-[#fff]">
                  Bed Room
                </span>
                {bed} <LuBedDouble className="text-xl" />
              </div>
            )}
            {bath && (
              <div className="w-full relative text-black py-2 text-center border-2 border-info rounded-lg capitalize flex justify-center items-center">
                <span className="absolute px-1 -top-2 left-2 text-xs bg-[#fff]">
                  Bath Room
                </span>
                {bath} <FaBath />
              </div>
            )}
          </div>
        )}
        <div className="card-actions justify-end">
          <Link
            href={`https://wa.me/201029939183?text=I'm%20interested%20in%20your%20offer%20at%20${location}+${id}`}
            className="btn btn-outline btn-accent"
          >
            <IoLogoWhatsapp /> WhatsApp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MapOffers;
