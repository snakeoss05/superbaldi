import React from "react";
import SideBar from "./components/SideBar";

export default function layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 s sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 ">
          <div className="lg:col-span-1">
            <SideBar />
          </div>
          <div className="lg:col-span-4 lg:ps-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
