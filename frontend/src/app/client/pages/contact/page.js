import React from "react";
import NextBreadcrumb from "../../components/Breadcrumb/Breadcrumb";

export default function Contact() {
  return (
    <div>
      <div className="flex flex-col items-center justify-start gap-4 py-8 bg-info-light w-full">
        <p className="text-lg sm:text-4xl text-gray-900 font-semibold">
          Contact Us
        </p>
        <NextBreadcrumb
          homeElement={"Home"}
          showtheLastElement={true}
          separator={
            <svg
              fill="currentColor"
              height="18px"
              className="my-auto text-gray-500"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              enableBackground="new 0 0 24 24"
              stroke="currentColor">
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <path d="M15.5,11.3L9.9,5.6c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l4.9,4.9l-4.9,4.9c-0.2,0.2-0.3,0.4-0.3,0.7c0,0.6,0.4,1,1,1c0.3,0,0.5-0.1,0.7-0.3l5.7-5.7c0,0,0,0,0,0C15.9,12.3,15.9,11.7,15.5,11.3z" />
              </g>
            </svg>
          }
          activeClasses="text-amber-500"
          containerClasses="flex flex-row flex-wrap p-4 rounded-lg "
          listClasses="hover:underline mx-2 font-normal text-sm"
          capitalizeLinks
        />
      </div>
      <div className="w-full max-w-screen-lg mx-auto grid grid-cols-1 items-center h-fit sm:h-[70vh] sm:grid-cols-3 gap-8 p-4 ">
        <div className="sm:col-span-2 space-y-3 ">
          <p className="text-lg sm:text-4xl text-gray-900 font-semibold">
            تواصل معنا
          </p>
          <p className="text-gray-500">
            استخدم النموذج أدناه للتواصل مع فريق المبيعات
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-2">
            <input
              type="text"
              placeholder="اسمك*"
              className="border border-gray-300 rounded-xl p-3 focus:outline-none text-lg"
            />
            <input
              type="text"
              placeholder="بريدك الإلكتروني*"
              className="border border-gray-300 rounded-xl p-3 focus:outline-none text-lg"
            />
            <input
              type="text"
              placeholder="بريدك الإلكتروني*"
              className="border border-gray-300 rounded-xl p-3 focus:outline-none text-lg col-span-2"
            />
            <textarea
              type="text"
              placeholder="رسالتك*"
              className="border border-gray-300 rounded-xl p-3 min-h-[200px] focus:outline-none text-lg col-span-2"
            />
            <div>
              <button className="bg-black hover:bg-[#D2EF9A] text-white hover:text-black py-3 uppercase font-semibold text-sm transition-all ease-in duration-300  px-6 rounded-lg">
                إرسال الرسالة
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 items-start justify-start">
          <p className="text-lg sm:text-4xl text-gray-900 font-semibold">
            متجرنا
          </p>
          <p className="text-gray-500">
            العنوان: 48 شارع التطوير، حي التحرير، تونس، تونس
          </p>
          <p className="text-gray-500">الهاتف: 27768325</p>
          <p className="text-lg sm:text-4xl text-gray-900 font-semibold">
            ساعات العمل
          </p>
          <p className="text-gray-500">
            من الاثنين إلى الجمعة: من 9 صباحًا إلى 5 مساءً
          </p>
          <p className="text-gray-500">
            السبت والأحد: من 10 صباحًا إلى 4 مساءً
          </p>
        </div>
      </div>
    </div>
  );
}
