import Navbar from "./Navbar/Navbar";
import Footer from "./footer/Footer";

import dynamic from "next/dynamic";
const ShopCart = dynamic(() => import("./shopCart/ShopCart"), {
  ssr: false,
  loading: () => <div className="hidden">Loading cart...</div>,
});

const QuickView = dynamic(() => import("./ProductItem/QuickView"), {
  ssr: false,
  loading: () => <div className="hidden">Loading quick view...</div>,
});

const NotificationSidebar = dynamic(
  () => import("./StockNotificationBar/NotificationSidebar"),
  {
    ssr: false,
    loading: () => <div className="hidden">Loading notifications...</div>,
  }
);

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col  ">
      <ShopCart />
      <Navbar />
      <QuickView />
      <NotificationSidebar />
      <main className="w-full  mx-auto  ">{children}</main>
      <Footer />
    </div>
  );
}
