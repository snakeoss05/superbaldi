"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import Otp from "../../components/otp/Otp";
import { useRouter } from "next/navigation";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tabs, setShowTabs] = useState("send-otp");

  async function HandleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/send-otp",
        { email }
      );
      setLoading(false);
      toast.success("OTP sent successfully");
      setShowTabs("verify-otp");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  }
  async function resetPassword(e) {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setLoading(false);
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        { email, password }
      );
      setLoading(false);
      toast.success("Password reset successfully");
      router.push("/client/pages/signin");
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong");
    }
  }
  return (
    <div className="mx-auto max-w-screen-xl py-8 lg:px-8">
      <div className="mx-auto max-w-lg">
        <Image
          src="/fashion/bacola-logo.avif"
          alt="logo"
          className="mx-auto w-auto h-32 sm:h-20"
          width={200}
          height={200}
        />

        {(() => {
          switch (tabs) {
            case "send-otp":
              return (
                <form
                  action="#"
                  className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                  <p className="text-center text-lg font-medium mb-4">
                    Forgot your password?
                  </p>
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={HandleSubmit}
                    className="block w-full rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-white">
                    {loading ? (
                      <span role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </span>
                    ) : (
                      "Send Email Verification"
                    )}
                  </button>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col sm:flex-row gap-2 px-4">
                      <p className="text-center text-sm text-gray-500">
                        No account?
                      </p>
                      <Link
                        className="underline ms-2"
                        href="/client/pages/signup">
                        Sign up
                      </Link>
                    </div>
                  </div>
                </form>
              );
            case "verify-otp":
              return <Otp email={email} setTabs={setShowTabs} />;
            case "success":
              return (
                <div className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8">
                  <div>
                    <label htmlFor="password" className="sr-only">
                      New Password
                    </label>

                    <div className="relative">
                      <input
                        type="password"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Confirm Password
                    </label>

                    <div className="relative">
                      <input
                        type="password"
                        className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                        placeholder="Enter password Confirmation"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />

                      <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="size-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={resetPassword}
                    className="block w-full rounded-lg bg-red-500 px-5 py-3 text-sm font-medium text-white">
                    {loading ? (
                      <span role="status">
                        <svg
                          aria-hidden="true"
                          className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                      </span>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
              );
          }
        })()}
      </div>
    </div>
  );
}
