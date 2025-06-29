"use client";
import React, { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Otp({ email, setTabs }) {
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState("");
  const navigate = useRouter();
  const handleChange = (index, value) => {
    const newOtp = code.split("");
    newOtp[index] = value;
    setCode(newOtp.join(""));

    if (value !== "" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };
  const handleKeyDown = (index, e) => {
    if ((e.keyCode = 8 && index > 0 && code[index] === "")) {
      inputRefs.current[index - 1].focus();
    }
  };
  async function verifyOtp(e) {
    e.preventDefault();
    setLoading(true);
    const data = {
      email: email,
      otp: code,
    };

    try {
      await axios.post(
        "https://superbaldi-production.up.railway.app/api/auth/verify-otp",
        data
      );
      loginAction({ email: email, password: password });
      toast.success("OTP verified successfully");
      setTabs("success");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="flex  md:w-1/2 justify-center py-10 items-center bg-white mx-auto">
      <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-fit max-w-lg rounded-2xl">
        <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
          <div className="flex flex-col items-center justify-center text-center space-y-2">
            <div className="font-semibold text-3xl">
              <p>
                We have sent an email to{" "}
                <span className="font-bold">{email}</span>
              </p>
            </div>
            <div className="flex flex-row text-sm font-medium text-gray-400">
              Please check your email and click on the link to reset your
              password
            </div>
          </div>
          <div>
            <form>
              <div className="flex flex-col space-y-16 ">
                <div className="flex flex-row items-center justify-between mx-auto w-full  gap-2">
                  {[...Array(6)].map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      className="w-16 h-16 flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                      maxLength="1"
                      value={code[index] || ""}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      ref={(ref) => (inputRefs.current[index] = ref)}
                    />
                  ))}
                </div>
                <div className="flex flex-col space-y-5">
                  <div>
                    {loading ? (
                      <span className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-center text-white loading loading-infinity loading-lg"></span>
                    ) : (
                      <button
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 border-blue-600 bg-blue-600 border-none text-white text-sm shadow-sm"
                        onClick={verifyOtp}>
                        Verify Account
                      </button>
                    )}
                  </div>
                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                    <p>Didn t recieve code?</p>
                    <a
                      className="flex flex-row items-center text-blue-600"
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer">
                      Resend
                    </a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
