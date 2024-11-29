import ImageHome from "./components/home/ImageHome";
import MainBanner from "./components/home/bannerSearchHome/mainBanner";
import GetAllOfferComponent from "./components/home/offers/GetAllOfferComponent";
export default function Home() {
  return (
    <div className="">
      <ImageHome />
      <div className="relative top-[60vh] lg:top-[70vh]">
        <MainBanner />
        <GetAllOfferComponent />
      </div>
    </div>
  );
}
