import React from "react";

export default function Banner() {
  return (
    <div className=" py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {/* Customer Service */}
          <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row items-center text-center sm:text-right">
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:ml-6">
              <svg
                className=" h-10 w-10 sm:h-12 sm:w-12 text-primary"
                fill="currentColor"
                viewBox="0 0 336.265 336.265"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M272.538,263.469l-34.566-34.564c-13.633-13.635-35.744-13.637-49.379-0.003l-10.736,10.738 c-0.25,0.247-0.488,0.514-0.727,0.77l-79.914-79.914c0.258-0.238,0.516-0.472,0.77-0.726l10.736-10.738 c13.635-13.634,13.633-35.743-0.002-49.379L74.157,65.089c-13.639-13.642-35.748-13.64-49.383-0.004L14.038,75.822 c-29.041,29.04-9.205,98.218,70.172,177.593c79.373,79.377,148.547,99.221,177.594,70.173l10.738-10.737 C286.175,299.216,286.175,277.106,272.538,263.469z" />
                <path d="M292.856,252.482c-3.55,0-7.138-1.023-10.301-3.159c-8.442-5.698-10.666-17.161-4.968-25.603 c13.366-19.802,20.432-42.958,20.432-66.965c0-66.098-53.774-119.872-119.871-119.872c-23.246,0-45.785,6.656-65.18,19.249 c-8.542,5.547-19.964,3.118-25.51-5.424c-5.547-8.542-3.118-19.964,5.424-25.51C118.271,8.713,147.755,0,178.148,0 c86.435,0,156.754,70.32,156.754,156.756c0,31.389-9.248,61.681-26.744,87.601C304.595,249.635,298.778,252.482,292.856,252.482z" />
                <path d="M200.023,165.163h-33.438l19.504-21.721c10.252-10.695,16.125-22.079,16.125-31.248c0-15.996-12.35-26.743-30.732-26.743 c-10.402,0-21.269,4.638-29.066,12.408c-1.564,1.556-2.441,3.668-2.441,5.873c-0.004,2.204,0.873,4.318,2.432,5.877l0.666,0.667 c3.234,3.23,8.475,3.238,11.715,0.015c4.449-4.42,11-7.276,16.695-7.276c6.01,0,13.17,1.593,13.17,9.179 c0,3.569-3.523,11.085-11.264,19.151c-0.063,0.063-0.123,0.128-0.18,0.194l-31.506,35.006c-1.371,1.523-2.129,3.501-2.129,5.552 v2.331c0,4.583,3.715,8.299,8.299,8.299h52.15c4.582,0,8.297-3.715,8.297-8.299v-0.966 C208.32,168.878,204.605,165.163,200.023,165.163z" />
                <path d="M259.681,140.744h-4.85v-17.88c0-4.583-3.717-8.298-8.299-8.298h-0.969c-4.584,0-8.299,3.715-8.299,8.298v17.88h-16.568 l24.66-42.855c1.475-2.568,1.473-5.729-0.01-8.293c-1.482-2.565-4.221-4.144-7.184-4.144h-1.107 c-2.971,0-5.713,1.587-7.193,4.161l-31.17,54.201c-0.723,1.259-1.105,2.685-1.105,4.137v2.06c0,4.583,3.715,8.298,8.299,8.298 h31.379v16.12c0,4.583,3.715,8.299,8.299,8.299h0.969c4.582,0,8.299-3.715,8.299-8.299v-16.12h4.85 c4.582,0,8.299-3.715,8.299-8.298v-0.967C267.98,144.46,264.263,140.744,259.681,140.744z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-lg font-semibold text-gray-900">
                خدمة العملاء على مدار الساعة طوال أيام الأسبوع
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600">
                اتصل بنا على 27768325
              </p>
            </div>
          </div>

          {/* Warranty */}
          <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row items-center text-center sm:text-right">
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:ml-6">
              <svg
                className=" h-10 w-10 sm:h-12 sm:w-12 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 12L11 14L15 9.99999M20 12C20 16.4611 14.54 19.6937 12.6414 20.683C12.4361 20.79 12.3334 20.8435 12.191 20.8712C12.08 20.8928 11.92 20.8928 11.809 20.8712C11.6666 20.8435 11.5639 20.79 11.3586 20.683C9.45996 19.6937 4 16.4611 4 12V8.21759C4 7.41808 4 7.01833 4.13076 6.6747C4.24627 6.37113 4.43398 6.10027 4.67766 5.88552C4.9535 5.64243 5.3278 5.50207 6.0764 5.22134L11.4382 3.21067C11.6461 3.13271 11.75 3.09373 11.857 3.07827C11.9518 3.06457 12.0482 3.06457 12.143 3.07827C12.25 3.09373 12.3539 3.13271 12.5618 3.21067L17.9236 5.22134C18.6722 5.50207 19.0465 5.64243 19.3223 5.88552C19.566 6.10027 19.7537 6.37113 19.8692 6.6747C20 7.01833 20 7.41808 20 8.21759V12Z"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-lg font-semibold text-gray-900">
                ضمان لمدة 3 أيام
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600">
                لديك الحق في إرجاع طلباتك خلال 3 أيام
              </p>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row items-center text-center sm:text-right">
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:ml-6">
              <svg
                className=" h-10 w-10 sm:h-12 sm:w-12 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  opacity="0.4"
                  d="M11.9998 14H12.9998C14.0998 14 14.9998 13.1 14.9998 12V2H5.99976C4.49976 2 3.18977 2.82999 2.50977 4.04999"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 17C2 18.66 3.34 20 5 20H6C6 18.9 6.9 18 8 18C9.1 18 10 18.9 10 20H14C14 18.9 14.9 18 16 18C17.1 18 18 18.9 18 20H19C20.66 20 22 18.66 22 17V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L18.58 6.01001C18.22 5.39001 17.56 5 16.84 5H15V12C15 13.1 14.1 14 13 14H12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22 12V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L22 12Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-lg font-semibold text-gray-900">
                التوصيل خلال 24 ساعة
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600">
                توصيل مجاني عند الشراء بمبلغ 300 دينار تونسي أو أكثر
              </p>
            </div>
          </div>

          {/* Product */}
          <div className="bg-white p-3 sm:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col sm:flex-row items-center text-center sm:text-right">
            <div className="flex-shrink-0 mb-4 sm:mb-0 sm:ml-6">
              <svg
                fill="currentColor"
                className=" h-10 w-10 sm:h-12 sm:w-12 text-primary"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <title>open</title>{" "}
                  <path d="M28 31h-24c-1.657 0-3-1.344-3-3v-14c0-1.657 1.343-3 3-3h24c1.656 0 3 1.343 3 3v14c0 1.656-1.344 3-3 3zM8 18.041c-1.657 0-3 1.567-3 3.5 0 1.934 1.343 3.5 3 3.5s3-1.566 3-3.5c0-1.933-1.344-3.5-3-3.5zM15.78 18.898c-0.115-0.237-0.269-0.422-0.458-0.553-0.19-0.132-0.426-0.221-0.707-0.268-0.2-0.037-0.49-0.055-0.87-0.055h-1.783v6.914h1.008v-2.016h0.842c0.81 0 1.368-0.356 1.679-0.693 0.309-0.338 0.464-1.812 0.464-2.299-0.001-0.282-0.059-0.793-0.175-1.030zM21.024 23.945h-3.058v-2.008h2.956v-0.93h-2.956v-2.055h3.050v-0.93h-3.995v6.914h4.003v-0.991zM26.954 18.023h-0.914v5.31l-3.012-5.31h-1.027v6.914h0.977v-5.061l3.012 5.061h0.965v-6.914zM13.823 21.93h-0.853v-2.977h0.838c0.343 0 0.578 0.017 0.706 0.051 0.197 0.055 0.357 0.166 0.478 0.336s0.182 0.375 0.182 0.613c0 0.33-0.103 1.522-0.309 1.704s-0.553 0.273-1.042 0.273zM8 24.125c-1.104 0-2-1.119-2-2.5s0.896-2.5 2-2.5 2 1.119 2 2.5-0.896 2.5-2 2.5zM25 11l-7.322-5.45c-0.344 0.277-0.775 0.45-1.25 0.45-0.662 0-1.244-0.325-1.607-0.821l-7.821 5.821h-1l8.493-6.518c-0.038-0.155-0.065-0.315-0.065-0.482 0-1.104 0.896-2 2-2 1.105 0 2 0.896 2 2 0 0.359-0.103 0.692-0.269 0.984l7.841 6.016h-1z" />{" "}
                </g>
              </svg>
            </div>
            <div>
              <h3 className="text-sm sm:text-lg font-semibold text-gray-900">
                مفتوح يوميًا
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600">
                من الساعة 8:00 صباحًا إلى 5:00 مساءً
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
