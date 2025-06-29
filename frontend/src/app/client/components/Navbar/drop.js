import React, { useState } from "react";
import Link from "next/link";
const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative  text-left hidden sm:block">
      <div
        className="cursor-pointer"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onClick={() => setIsOpen(!isOpen)}>
        <button
          aria-label="Toggle Menu"
          className="rounded-md bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 text-center flex items-center gap-2"
          type="button">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <span className="font-medium text-gray-600">All Categories</span>
        </button>
        <div
          className={`origin-top-left absolute left-0 mt-2  w-fit top-full h-fit  sm:h-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition ease-out duration-300 ${
            isOpen
              ? "transform  opacity-100 scale-100"
              : "transform  opacity-0 scale-0"
          }`}>
          {" "}
          <div className="relative  top-0  left-0  h-full   w-56  z-50">
            <ul className="flex flex-col   p-4 sm:p-2   bg-white">
              <li className="p-2">
                <Link
                  href={`/client/pages/product?category=phones`}
                  className="text-lg hover:bg-gray-200 rounded-lg font-bold p-2 gap-4 flex items-center flex-row">
                  <svg
                    width="32px"
                    height="32px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M4 10C4 6.22876 4 4.34315 5.17157 3.17157C6.34315 2 8.22876 2 12 2C15.7712 2 17.6569 2 18.8284 3.17157C20 4.34315 20 6.22876 20 10V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14V10Z"
                        stroke="#1C274C"
                        strokeWidth="1.5"></path>{" "}
                      <path
                        d="M15 19H9"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                        strokeLinecap="round"></path>{" "}
                    </g>
                  </svg>
                  <span>Phones</span>
                </Link>
              </li>
              <li className="p-2">
                <Link
                  href={`/client/pages/product?category=laptops`}
                  className="text-lg hover:bg-gray-200 rounded-lg font-bold p-2 gap-4 flex items-center flex-row">
                  <svg
                    width="32px"
                    height="32px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M19.6471 15.5357V8C19.6471 6.11438 19.6471 5.17157 19.0613 4.58579C18.4755 4 17.5327 4 15.6471 4H12M19.6471 15.5357L21.3911 17.3358C21.4356 17.3818 21.4579 17.4048 21.4787 17.4276C21.7998 17.7802 21.9843 18.2358 21.999 18.7124C22 18.7433 22 18.7753 22 18.8393C22 18.9885 22 19.0631 21.996 19.1261C21.9325 20.1314 21.1314 20.9325 20.1261 20.996C20.0631 21 19.9885 21 19.8393 21H4.16068C4.01148 21 3.93688 21 3.87388 20.996C2.86865 20.9325 2.06749 20.1314 2.00398 19.1261C2 19.0631 2 18.9885 2 18.8393C2 18.7753 2 18.7433 2.00096 18.7124C2.01569 18.2358 2.20022 17.7802 2.52127 17.4276C2.54208 17.4048 2.56438 17.3818 2.60888 17.3358L4.35294 15.5357M19.6471 15.5357H17.0357M4.35294 15.5357V8C4.35294 6.11438 4.35294 5.17157 4.93873 4.58579C5.52451 4 6.46732 4 8.35294 4M4.35294 15.5357H13"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                        strokeLinecap="round"></path>{" "}
                      <path
                        d="M9.5 18.5H14.5"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                        strokeLinecap="round"></path>{" "}
                      <path
                        d="M12.75 6.75C12.75 7.16421 12.4142 7.5 12 7.5C11.5858 7.5 11.25 7.16421 11.25 6.75C11.25 6.33579 11.5858 6 12 6C12.4142 6 12.75 6.33579 12.75 6.75Z"
                        fill="#1C274C"></path>{" "}
                    </g>
                  </svg>
                  <span>Laptops</span>
                </Link>
              </li>
              <li className="p-2">
                <Link
                  href={`/client/pages/product?category=tablets`}
                  className="text-lg hover:bg-gray-200 rounded-lg font-bold p-2 gap-4 flex items-center flex-row">
                  <svg
                    width="32px"
                    height="32px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M10 20C6.22876 20 4.34315 20 3.17157 18.8284C2 17.6569 2 15.7712 2 12C2 8.22876 2 6.34315 3.17157 5.17157C4.34315 4 6.22876 4 10 4L14 4C17.7712 4 19.6569 4 20.8284 5.17157C22 6.34315 22 8.22876 22 12C22 15.7712 22 17.6569 20.8284 18.8284C19.6569 20 17.7712 20 14 20H10Z"
                        stroke="#1C274C"
                        strokeWidth="1.5"></path>{" "}
                      <path
                        d="M15 17H9"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                        strokeLinecap="round"></path>{" "}
                    </g>
                  </svg>
                  <span>Tablets</span>
                </Link>
              </li>
              <li className="toggler p-2">
                <Link
                  href={`/client/pages/product?category=gaming`}
                  className="text-lg hover:bg-gray-200 rounded-lg font-bold p-2 gap-4 flex items-center flex-row">
                  <svg
                    width="32px"
                    height="32px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M7.99999 8.5C7.99999 7.94772 7.55227 7.5 6.99999 7.5C6.4477 7.5 5.99999 7.94772 5.99999 8.5V9H5.49999C4.9477 9 4.49999 9.44771 4.49999 10C4.49999 10.5523 4.9477 11 5.49999 11H5.99999V11.5C5.99999 12.0523 6.4477 12.5 6.99999 12.5C7.55227 12.5 7.99999 12.0523 7.99999 11.5V11H8.49999C9.05227 11 9.49999 10.5523 9.49999 10C9.49999 9.44771 9.05227 9 8.49999 9H7.99999V8.5Z"
                        fill="#1C274C"></path>{" "}
                      <path
                        d="M18 8C18 8.55229 17.5523 9 17 9C16.4477 9 16 8.55229 16 8C16 7.44772 16.4477 7 17 7C17.5523 7 18 7.44772 18 8Z"
                        fill="#1C274C"></path>{" "}
                      <path
                        d="M17 13C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11C16.4477 11 16 11.4477 16 12C16 12.5523 16.4477 13 17 13Z"
                        fill="#1C274C"></path>{" "}
                      <path
                        d="M16 10C16 10.5523 15.5523 11 15 11C14.4477 11 14 10.5523 14 10C14 9.44771 14.4477 9 15 9C15.5523 9 16 9.44771 16 10Z"
                        fill="#1C274C"></path>{" "}
                      <path
                        d="M19 11C19.5523 11 20 10.5523 20 10C20 9.44771 19.5523 9 19 9C18.4477 9 18 9.44771 18 10C18 10.5523 18.4477 11 19 11Z"
                        fill="#1C274C"></path>{" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 3C10.1879 3 7.96237 3.25817 6.21782 3.5093C3.94305 3.83676 2.09096 5.51696 1.60993 7.7883C1.34074 9.05935 1.07694 10.5622 1.01649 11.8204C0.973146 12.7225 0.877981 13.9831 0.777155 15.1923C0.672256 16.4504 1.09148 17.7464 1.86079 18.6681C2.64583 19.6087 3.88915 20.2427 5.32365 19.8413C6.24214 19.5842 6.97608 18.9387 7.5205 18.3026C8.07701 17.6525 8.51992 16.9124 8.83535 16.3103C9.07821 15.8467 9.50933 15.5855 9.91539 15.5855H14.0846C14.4906 15.5855 14.9218 15.8467 15.1646 16.3103C15.4801 16.9124 15.923 17.6525 16.4795 18.3026C17.0239 18.9387 17.7578 19.5842 18.6763 19.8413C20.1108 20.2427 21.3541 19.6087 22.1392 18.6681C22.9085 17.7464 23.3277 16.4504 23.2228 15.1923C23.122 13.9831 23.0268 12.7225 22.9835 11.8204C22.923 10.5622 22.6592 9.05935 22.39 7.7883C21.909 5.51696 20.0569 3.83676 17.7821 3.5093C16.0376 3.25817 13.8121 3 12 3ZM6.50279 5.48889C8.22744 5.24063 10.3368 5 12 5C13.6632 5 15.7725 5.24063 17.4972 5.4889C18.965 5.70019 20.1311 6.77489 20.4334 8.20267C20.6967 9.44565 20.9332 10.8223 20.9858 11.9164C21.0309 12.856 21.1287 14.1463 21.2297 15.3585C21.2912 16.0956 21.0342 16.8708 20.6037 17.3866C20.1889 17.8836 19.7089 18.0534 19.2153 17.9153C18.8497 17.8129 18.4327 17.509 17.9989 17.0021C17.5771 16.5094 17.2144 15.9131 16.9362 15.3822C16.4043 14.3667 15.3482 13.5855 14.0846 13.5855H9.91539C8.65178 13.5855 7.59571 14.3667 7.06374 15.3822C6.78558 15.9131 6.42285 16.5094 6.00109 17.0021C5.56723 17.509 5.15027 17.8129 4.78463 17.9153C4.29109 18.0534 3.81102 17.8836 3.39625 17.3866C2.96576 16.8708 2.70878 16.0956 2.77024 15.3585C2.87131 14.1463 2.96904 12.856 3.01418 11.9164C3.06675 10.8223 3.30329 9.44565 3.56653 8.20267C3.86891 6.77489 5.03497 5.70019 6.50279 5.48889Z"
                        fill="#1C274C"></path>{" "}
                    </g>
                  </svg>
                  <span>Gaming</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 512"
                    className="w-4 h-4 transition duration-300 ms-auto text-primary-400 transform rotate-90 arrow"
                    width="16px"
                    fill="currentColor"
                    height="16px">
                    <path
                      fill="currentColor"
                      d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
                    />
                  </svg>
                </Link>
                <div className="relative sm:absolute left-0 sm:left-full dropdown transition-all duration-300 ease-in sm:w-0 top-0  z-50 sm:shadow-md rounded h-0  bg-white sm:h-full"></div>
              </li>
              <li className="p-2 toggler">
                <Link
                  href="/client/pages/product?category=headphones"
                  className="text-lg hover:bg-gray-200 rounded-lg font-bold p-2 gap-4 flex items-center flex-row ">
                  <svg
                    width="32px"
                    height="32px"
                    viewBox="0 0 24.00 24.00"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M21 18V12C21 8.25027 21 6.3754 20.0451 5.06107C19.7367 4.6366 19.3634 4.26331 18.9389 3.95491C17.6246 3 15.7497 3 12 3C8.25027 3 6.3754 3 5.06107 3.95491C4.6366 4.26331 4.26331 4.6366 3.95491 5.06107C3 6.3754 3 8.25027 3 12V18"
                        stroke="#1C274C"
                        strokeWidth="1.5"></path>{" "}
                      <path
                        d="M22 15.5V17.5"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                        strokeLinecap="round"></path>{" "}
                      <path
                        d="M2 15.5V17.5"
                        stroke="#1C274C"
                        strokeWidth="1.5"
                        strokeLinecap="round"></path>{" "}
                      <path
                        d="M8 13.8446C8 13.0802 8 12.698 7.82526 12.4323C7.73733 12.2985 7.62061 12.188 7.4844 12.1095C7.21371 11.9535 6.84812 11.9896 6.11694 12.0617C4.88487 12.1831 4.26884 12.2439 3.82737 12.5764C3.60394 12.7448 3.41638 12.9593 3.27646 13.2067C3 13.6955 3 14.3395 3 15.6276V17.1933C3 18.4685 3 19.1061 3.28198 19.5986C3.38752 19.7829 3.51981 19.9491 3.67416 20.0913C4.08652 20.4714 4.68844 20.5901 5.89227 20.8275C6.73944 20.9945 7.16302 21.078 7.47564 20.9021C7.591 20.8372 7.69296 20.7493 7.77572 20.6434C8 20.3565 8 19.9078 8 19.0104V13.8446Z"
                        stroke="#1C274C"
                        strokeWidth="1.5"></path>{" "}
                      <path
                        d="M16 13.8446C16 13.0802 16 12.698 16.1747 12.4323C16.2627 12.2985 16.3794 12.188 16.5156 12.1095C16.7863 11.9535 17.1519 11.9896 17.8831 12.0617C19.1151 12.1831 19.7312 12.2439 20.1726 12.5764C20.3961 12.7448 20.5836 12.9593 20.7235 13.2067C21 13.6955 21 14.3395 21 15.6276V17.1933C21 18.4685 21 19.1061 20.718 19.5986C20.6125 19.7829 20.4802 19.9491 20.3258 20.0913C19.9135 20.4714 19.3116 20.5901 18.1077 20.8275C17.2606 20.9945 16.837 21.078 16.5244 20.9021C16.409 20.8372 16.307 20.7493 16.2243 20.6434C16 20.3565 16 19.9078 16 19.0104V13.8446Z"
                        stroke="#1C274C"
                        strokeWidth="1.5"></path>{" "}
                    </g>
                  </svg>
                  <span>HeadPhones </span>
                </Link>
              </li>
              <li className="p-2">
                <Link
                  href="/client/pages/product?category=smartwatch"
                  className="text-lg hover:bg-gray-200 rounded-lg font-bold p-2 gap-4 flex items-center flex-row">
                  <svg
                    width="32px"
                    height="32px"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7 3V4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20L7 21C7 22.6569 8.34315 24 10 24H14C15.6569 24 17 22.6569 17 21V20C18.6569 20 20 18.6569 20 17V13C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11V7C20 5.34315 18.6569 4 17 4V3C17 1.34315 15.6569 0 14 0H10C8.34315 0 7 1.34315 7 3ZM10 2C9.44772 2 9 2.44772 9 3V4H15V3C15 2.44772 14.5523 2 14 2H10ZM7 18C6.44772 18 6 17.5523 6 17V7C6 6.44771 6.44772 6 7 6H17C17.5523 6 18 6.44772 18 7V17C18 17.5523 17.5523 18 17 18H7ZM9 20H15V21C15 21.5523 14.5523 22 14 22H10C9.44772 22 9 21.5523 9 21V20Z"
                        fill="#1C274C"></path>{" "}
                    </g>
                  </svg>
                  <span>SmartWatch</span>
                </Link>
              </li>
              <li className="toggler p-2">
                <Link
                  href="/client/pages/product?category=accessories"
                  className="text-lg hover:bg-gray-200 rounded-lg font-bold p-2 gap-4 flex items-center flex-row">
                  <svg
                    fill="#000000"
                    width="32px"
                    height="32px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path d="M6,11 C4.00464401,11 3,8.99071198 3,7 C3,5.00928802 4.00464401,3 6,3 C9.18369666,3 11,6.46373745 11,9.48864223 L11,19.5 C11,20.3284271 10.3284271,21 9.5,21 C8.67157288,21 8,20.3284271 8,19.5 L8,11.4886745 C8,11.1076657 7.85740126,10.7509054 7.60936434,10.4788525 C7.18263334,10.822305 6.6417723,11 6,11 Z M9,11.4886745 L9,19.5 C9,19.7761424 9.22385763,20 9.5,20 C9.77614237,20 10,19.7761424 10,19.5 L10,9.48864223 C10,6.94328841 8.45660802,4 6,4 C4.74535599,4 4,5.49071198 4,7 C4,8.50928802 4.74535599,10 6,10 C6.78086003,10 7.25920718,9.64123964 7.52565835,8.84188612 C7.73504185,8.21373562 8.67724079,8.52066774 8.47645719,9.15161975 L8.28862692,9.74186659 C8.73853631,10.20221 9,10.8241255 9,11.4886745 Z M6,8 C5.44771525,8 5,7.55228475 5,7 C5,6.44771525 5.44771525,6 6,6 C6.55228475,6 7,6.44771525 7,7 C7,7.55228475 6.55228475,8 6,8 Z M16,11.4886745 L16,19.5 C16,20.3284271 15.3284271,21 14.5,21 C13.6715729,21 13,20.3284271 13,19.5 L13,9.48864223 C13,6.46373745 14.8163033,3 18,3 C19.995356,3 21,5.00928802 21,7 C21,8.99071198 19.995356,11 18,11 C17.3582277,11 16.8173667,10.822305 16.3906357,10.4788525 C16.1425987,10.7509054 16,11.1076657 16,11.4886745 Z M15.5235428,9.15161975 C15.3227592,8.52066774 16.2649581,8.21373562 16.4743416,8.84188612 C16.7407928,9.64123964 17.21914,10 18,10 C19.254644,10 20,8.50928802 20,7 C20,5.49071198 19.254644,4 18,4 C15.543392,4 14,6.94328841 14,9.48864223 L14,19.5 C14,19.7761424 14.2238576,20 14.5,20 C14.7761424,20 15,19.7761424 15,19.5 L15,11.4886745 C15,10.8241255 15.2614637,10.20221 15.7113731,9.74186659 L15.5235428,9.15161975 Z M18,8 C17.4477153,8 17,7.55228475 17,7 C17,6.44771525 17.4477153,6 18,6 C18.5522847,6 19,6.44771525 19,7 C19,7.55228475 18.5522847,8 18,8 Z"></path>{" "}
                    </g>
                  </svg>
                  <span>Accessories</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 256 512"
                    className="w-4 h-4 transition duration-300 ms-auto text-primary-400 transform rotate-90 arrow"
                    width="16px"
                    fill="currentColor"
                    height="16px">
                    <path
                      fill="currentColor"
                      d="M246.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-9.2-9.2-22.9-11.9-34.9-6.9s-19.8 16.6-19.8 29.6l0 256c0 12.9 7.8 24.6 19.8 29.6s25.7 2.2 34.9-6.9l128-128z"
                    />
                  </svg>
                </Link>
                <div className="relative sm:absolute left-0 sm:left-full dropdown transition-all duration-300 ease-in sm:w-0 top-0  z-50 sm:shadow-md rounded h-0  bg-white sm:h-full"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
