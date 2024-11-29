import React from "react";
import Image from "next/image";
import { IoLogoWhatsapp } from "react-icons/io";
import { TbMeterSquare } from "react-icons/tb";
import { RiCommunityLine } from "react-icons/ri";
import { LuPoundSterling, LuBedDouble } from "react-icons/lu";
import { FaBath } from "react-icons/fa";
import Link from "next/link";

interface OfferProps {
  cat: string;
  image_offer: string;
  location: string;
  areas: string;
  types: string;
  down_payment: string;
  installment: string;
  bed?: string;
  bath?: string;
}

const AllHotOffers = (props: OfferProps) => {
  return (
    <div
      className={`card bg-base-100 shadow-2xl relative h-fit ${
        props.cat === "hot" ? "" : "hidden"
      }`}
    >
      <figure>
        <Image
          src={`${process.env.img}/image/${props.image_offer}`}
          width={500}
          height={500}
          alt="Offer Image"
        />
      </figure>
      <div className="absolute top-3 right-4 bg-info text-white rounded-lg p-2 capitalize text-base">
        {props.location}
      </div>
      <div className="card-body min-w-min text-base">
        <div className="flex justify-between gap-2">
          <div className="w-full text-white py-2 text-center bg-primary rounded-lg text-xl flex justify-center items-center ">
            {props.areas}
            <TbMeterSquare className="text-2xl" />
          </div>
          <div className="w-full text-base text-white py-2 text-center bg-info rounded-lg capitalize flex justify-center items-center ">
            <RiCommunityLine />
            {props.types}
          </div>
        </div>
        <div className="flex justify-between gap-2">
          <div className="w-full relative text-black py-2 text-center border-2 border-primary rounded-lg text-xl flex justify-center items-center ">
            <span className="absolute px-1 -top-2 left-2 text-xs bg-white">
              Down Payment
            </span>
            {parseInt(props.down_payment).toLocaleString("en-US")}
            <LuPoundSterling className="text-xl" />
          </div>
          <div className="w-full relative text-black py-2 text-center border-2 border-info rounded-lg capitalize flex justify-center items-center gap-1">
            <span className="absolute px-1 -top-2 left-2 text-xs bg-white">
              Installment
            </span>
            {props.installment}
          </div>
        </div>
        {(props.bed || props.bath) && (
          <div className="flex justify-between gap-2">
            <div className="w-full relative text-black py-2 text-center border-2 border-primary rounded-lg text-xl flex justify-center items-center gap-1">
              <span className="absolute px-1 -top-2 left-2 text-xs bg-white">
                Bed Room
              </span>
              {props.bed}
              <LuBedDouble className="text-xl" />
            </div>
            <div className="w-full relative text-black py-2 text-center border-2 border-info rounded-lg capitalize flex justify-center items-center gap-1">
              <span className="absolute px-1 -top-2 left-2 text-xs bg-white">
                Bath Room
              </span>
              {props.bath}
              <FaBath />
            </div>
          </div>
        )}
        <div className="card-actions justify-end">
          <Link
            href={`https://wa.me/201029939183?text=I'm%20interested%20in%20your%20offer%20at%20`}
            className="btn btn-outline btn-accent"
          >
            <IoLogoWhatsapp />
            WhatsApp
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AllHotOffers;
