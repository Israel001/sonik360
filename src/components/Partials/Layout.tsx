import { useState } from "react";
import DiscountBanner from "../Home/DiscountBanner";
import Drawer from "../Mobile/Drawer";
import Footer from "./Footers/Footer";
import Header from "./Headers/HeaderOne";
import { ToastContainer } from "react-toastify";

export interface ILayout {
  [x: string]: any;
}

export default function Layout({ children, childrenClasses }: ILayout) {
  const [drawer, setDrawer] = useState(false);
  return (
    <>
      <Drawer open={drawer} action={() => setDrawer(!drawer)} />
      <div className="w-full overflow-x-hidden">
        <Header drawerAction={() => setDrawer(!drawer)} />
        <div className={`w-full  ${childrenClasses || 'pb-[60px]'}`}>
          {children && children}
        </div>
        <DiscountBanner />
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
}
