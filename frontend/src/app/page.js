import Banner from "./client/components/Home/banners/Banner";
import Header from "./client/components/Home/header/Header";
import NewArrial from "./client/components/Home/NewArrial/NewArrial";
import ChooseUs from "./client/components/Home/ChooseUs/ChooseUs";
import Categorys from "./client/components/Home/categorys/Categorys";
import BestSales from "./client/components/Home/bestSales/BestSales";
import News from "./client/components/Home/News/News";

export default function Home() {
  return (
    <div className="w-full overflow-hidden px-4 sm:px-0">
      <Header />
      <Banner />
      <Categorys />
      <NewArrial />
      <ChooseUs />
      <BestSales />
      <News />
    </div>
  );
}
