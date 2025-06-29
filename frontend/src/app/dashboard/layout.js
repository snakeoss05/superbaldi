import React from "react";
import SideBarDashBord from "./components/SideBarDashBord";

export default function layout({ children }) {
  return (
    <div className="flex flex-row w-full overflow-auto max-w-screen-xl mx-auto min-h-[80vh]">
      <div className="flex ">
        <SideBarDashBord />
      </div>

      <div className="w-[82vw] overflow-hidden">{children}</div>
    </div>
  );
}
