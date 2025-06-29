"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBarDashBord() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path) => {
    return pathname === path || pathname?.startsWith(path + "/");
  };

  return (
    <div
      className={`bg-white border-b sm:text-start lg:border-b-0 lg:border-l border-gray-200 rounded-lg shadow-sm transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } dark:bg-gray-800 flex flex-col items-start justify-start p-4`}>
      <div className="flex justify-between items-center gap-2 w-full mb-6">
        <h2
          className={`font-bold text-xl text-gray-800 dark:text-white ${
            isCollapsed ? "hidden" : "block"
          }`}>
          لوحة التحكم
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
              isCollapsed ? "" : "rotate-180"
            }`}>
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>

      <div className="space-y-6 w-full">
        {/* Products Section */}
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
              <path d="M20 7h-3V6a3 3 0 0 0-3-3H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3 3 0 0 0-3-3z" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            {!isCollapsed && (
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                إدارة المنتجات
              </p>
            )}
          </div>

          <ul className="space-y-1">
            <li>
              <Link
                href="/dashboard/Sales"
                className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                  isActive("/dashboard/Sales")
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
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {!isCollapsed && <span>المبيعات</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/addproduct"
                className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                  isActive("/dashboard/addproduct")
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
                  <path d="M12 5v14M5 12h14" />
                </svg>
                {!isCollapsed && <span>إضافة منتج</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/updateproduct"
                className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                  isActive("/dashboard/updateproduct")
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
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
                {!isCollapsed && <span>تحديث منتج</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/Category"
                className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                  isActive("/dashboard/Category")
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
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                {!isCollapsed && <span>الفئات</span>}
              </Link>
            </li>
          </ul>
        </div>

        {/* Orders Section */}
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
                إدارة الطلبات
              </p>
            )}
          </div>

          <ul className="space-y-1">
            <li>
              <Link
                href="/dashboard/orders"
                className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                  isActive("/dashboard/orders")
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
                {!isCollapsed && <span>الطلبات</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/place-order"
                className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                  isActive("/dashboard/place-order")
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
                {!isCollapsed && <span>إنشاء طلب</span>}
              </Link>
            </li>
          </ul>
        </div>

        {/* Settings Section */}
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
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1.51 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1.51H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1.51-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1.51H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
            {!isCollapsed && (
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                الإعدادات
              </p>
            )}
          </div>

          <ul className="space-y-1">
            <li>
              <Link
                href="/dashboard/users"
                className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                  isActive("/dashboard/users")
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
                {!isCollapsed && <span>المستخدمون</span>}
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/verification"
                className={`flex items-center gap-2 p-2 rounded-md transition-colors ${
                  isActive("/dashboard/verification")
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
                {!isCollapsed && <span>التحقق من الحسابات</span>}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
