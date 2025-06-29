"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path) => {
    return pathname === path || pathname?.startsWith(path + "/");
  };

  return (
    <div
      className={`bg-white border-b sm:text-end lg:border-b-0 lg:border-r border-gray-200 rounded-lg shadow-sm transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } dark:bg-gray-800 flex flex-col items-start justify-start p-4`}>
      <div className="flex justify-between items-center w-full mb-6">
        <h2
          className={`font-bold text-xl text-gray-800 dark:text-white ${
            isCollapsed ? "hidden" : "block"
          }`}>
          حسابي
        </h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`transform transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      <div className="space-y-6 w-full">
        {/* قسم إدارة الحساب */}
        <div className="space-y-2">
          <div
            className={`flex items-center gap-2 ${
              isCollapsed ? "justify-center" : "space-x-2"
            }`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500 dark:text-gray-400">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            {!isCollapsed && (
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                إدارة الحساب
              </p>
            )}
          </div>

          <ul className="space-y-1">
            <li>
              <Link
                href="/client/pages/myaccount/myprofile"
                className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                  isActive("/client/pages/myaccount/myprofile")
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                } ${isCollapsed ? "justify-center" : "space-x-2"}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {!isCollapsed && <span>ملفي الشخصي</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/client/pages/myaccount/myAddress"
                className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                  isActive("/client/pages/myaccount/myAddress")
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                } ${isCollapsed ? "justify-center" : "space-x-2"}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {!isCollapsed && <span>عنواني</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/client/pages/myaccount/documents"
                className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                  isActive("/client/pages/myaccount/documents")
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                } ${isCollapsed ? "justify-center" : "space-x-2"}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
                {!isCollapsed && <span>مستنداتي</span>}
              </Link>
            </li>
          </ul>
        </div>

        {/* قسم الطلبات */}
        <div className="space-y-2">
          <div
            className={`flex items-center gap-2 ${
              isCollapsed ? "justify-center" : "space-x-2"
            }`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-gray-500 dark:text-gray-400">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {!isCollapsed && (
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                الطلبات
              </p>
            )}
          </div>

          <ul className="space-y-1">
            <li>
              <Link
                href="/client/pages/myaccount/myorder"
                className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                  isActive("/client/pages/myaccount/myorder")
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
                } ${isCollapsed ? "justify-center" : "space-x-2"}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                  <line x1="12" y1="22.08" x2="12" y2="12" />
                </svg>
                {!isCollapsed && <span>طلباتي</span>}
              </Link>
            </li>
          </ul>
        </div>

        {/* قسم الأمان */}
      </div>
    </div>
  );
}
