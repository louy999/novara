import React from "react";
import Image from "next/image";

const ImageHome = () => {
  return (
    <div className="fixed w-full h-[55vh] sm:h-[60vh] md:h-[50vh] lg:h-[75vh]">
      <Image
        src="/homeBack.jpg"
        alt="Luxury Property"
        layout="fill"
        objectFit="cover"
        quality={90}
        priority
      />
      <div className="absolute inset-0 bg-black opacity-30 z-20"></div>
    </div>
  );
};

export default ImageHome;
