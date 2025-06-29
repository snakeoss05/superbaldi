import React from "react";

const ServicesPage = () => {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Our Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2  md:px-32  gap-8 mb-12">
        <div className="bg-white rounded-lg shadow p-6 flex mx-auto items-center">
          <div className="h-12 w-12 text-blue-500 mr-4">
            <svg
              fill="currentColor"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 210 256"
              enableBackground="new 0 0 210 256"
              xmlSpace="preserve">
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path d="M174.55,144.5L174.55,144.5c-1.4-4-5-6.5-9.2-6.5H159V23c0-11.708-9.292-21-21-21H25C12.57,2,2,12.57,2,25v183 c0,11.9,10.95,22,22.75,22l114.213,0c1.207,0,2.27,0.984,2.18,2.188c-0.095,1.266-1.153,1.812-2.393,1.812h-45.5L128,254h80 L174.55,144.5z M82.05,220.2c-3.199,0-5.599-2.399-5.6-5.598c-0.001-3.045,2.557-5.602,5.602-5.602 c3.199,0.001,5.598,2.401,5.598,5.6C87.55,217.8,85.25,220.2,82.05,220.2z M144,138h-19.65c-5.3,0-9.8,4.7-9.8,10l0,0 c0,5.3,4.5,10,9.8,10h19.8v42H18V31h126V138z M81.226,185.644L81.226,185.644c-6.536,0-11.883-5.347-11.883-11.883V93.22 c0-0.478,0.032-0.949,0.088-1.413c-8.659-4.333-14.608-13.28-14.608-23.621c0-11.175,6.946-20.722,16.754-24.576v24.576h19.3V43.611 c9.807,3.854,16.754,13.401,16.754,24.576c0,10.341-5.949,19.289-14.608,23.621c0.056,0.464,0.088,0.934,0.088,1.413v80.54 C93.109,180.296,87.761,185.644,81.226,185.644z" />{" "}
              </g>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Phone Repair</h2>
            <p className="text-gray-700">
              Expert repairs for all major phone brands. Screen replacements,
              battery replacements, and more.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex mx-auto items-center">
          <div className="h-12 w-12 text-green-500 mr-4">
            <svg
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor">
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <title>computer-setting</title>{" "}
                <g id="Layer_2" data-name="Layer 2">
                  {" "}
                  <g id="invisible_box" data-name="invisible box">
                    {" "}
                    <rect width={48} height={48} fill="none" />{" "}
                  </g>{" "}
                  <g id="icons_Q2" data-name="icons Q2">
                    {" "}
                    <g>
                      {" "}
                      <path d="M7,34H19a2,2,0,0,0,0-4H9V10H39V30H29a2,2,0,0,0,0,4H41a2,2,0,0,0,2-2V8a2,2,0,0,0-2-2H7A2,2,0,0,0,5,8V32A2,2,0,0,0,7,34Z" />{" "}
                      <path d="M44,38H4a2,2,0,0,0,0,4H44a2,2,0,0,0,0-4Z" />{" "}
                      <path d="M31.9,21.3A5.7,5.7,0,0,0,32,20a5.7,5.7,0,0,0-.1-1.3l-2.2-.5a4.2,4.2,0,0,0-.4-1l1.2-1.9a7.7,7.7,0,0,0-1.8-1.8l-1.9,1.2-1-.4-.5-2.2H22.7l-.5,2.2-1,.4-1.9-1.2a7.7,7.7,0,0,0-1.8,1.8l1.2,1.9a4.2,4.2,0,0,0-.4,1l-2.2.5A5.7,5.7,0,0,0,16,20a5.7,5.7,0,0,0,.1,1.3l2.2.5a4.2,4.2,0,0,0,.4,1l-1.2,1.9a7.7,7.7,0,0,0,1.8,1.8l1.9-1.2,1,.4.5,2.2h2.6l.5-2.2,1-.4,1.9,1.2a7.7,7.7,0,0,0,1.8-1.8l-1.2-1.9a4.2,4.2,0,0,0,.4-1ZM24,22a2,2,0,1,1,2-2A2,2,0,0,1,24,22Z" />{" "}
                    </g>{" "}
                  </g>{" "}
                </g>{" "}
              </g>
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Computer Repair</h2>
            <p className="text-gray-700">
              Comprehensive computer repair services. Hardware upgrades, virus
              removal, and troubleshooting.
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-center mb-6">Find Us Here</h2>
      <div className="flex justify-center">
        <div className="w-full md:w-3/4 h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1128.9989171854252!2d10.148401994044693!3d36.835502334661655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd3312d9dfed6f%3A0x2b3e065a01842e73!2sEl%20Manar%201%2C%20Tunis!5e0!3m2!1sfr!2stn!4v1721827365722!5m2!1sfr!2stn"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
