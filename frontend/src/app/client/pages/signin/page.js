"use client";
import React, { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import Link from "next/link";
import toast from "react-hot-toast";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";
import { login } from "@/lib/features/auth/authAction";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [logform, setlogform] = useState({
    email: "",
    password: "",
  });
  async function loginform(e) {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.1.3:5000/api/auth/login",
        logform
      );

      const { token, user } = response.data;
      dispatch(login({ token: token, user: user }));
      setLoading(false);
      toast.success("تم تسجيل الدخول بنجاح");
      router.push("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }
  function HandleChange(event) {
    const { name, value } = event.target;

    setlogform((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));
  }
  return (
    <div>
      <div className="mx-auto w-full max-w-xl px-2 py-8 h-[80vh] lg:px-8 flex flex-col items-center justify-center">
        <h1 className="text-center text-2xl font-semibold text-black sm:text-3xl">
          حسابي
        </h1>

        <form className="grid w-full mb-0 mt-6 rounded-lg p-4 gap-6 shadow-lg sm:p-6 lg:p-8">
          <p className="text-center text-lg font-medium">
            سجل الدخول إلى حسابك
          </p>

          <div>
            <label htmlFor="email" className="sr-only">
              البريد الإلكتروني
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="أدخل البريد الإلكتروني"
                name="email"
                value={logform.email}
                onChange={HandleChange}
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

          <div>
            <label htmlFor="password" className="sr-only">
              كلمة المرور
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="أدخل كلمة المرور"
                name="password"
                value={logform.password}
                onChange={HandleChange}
                autoComplete="current-password"
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
            <button
              onClick={loginform}
              type="submit"
              className="block w-full rounded-lg bg-primary hover:bg-secondary hover:text-black transation duration-300 px-5 py-3 text-sm font-medium text-white">
              {loading ? (
                <span role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray animate-spin  fill-red-600"
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
                "تسجيل الدخول"
              )}
            </button>
          </div>

          <div className="flex items-center flex-row justify-between">
            <div className="flex flex-col sm:flex-row gap-2 px-4">
              <p className="text-center text-sm text-gray-500">
                ليس لديك حساب؟
              </p>
              <Link
                className="underline ms-2 hover:text-primary"
                href="/client/pages/signup">
                إنشاء حساب
              </Link>
            </div>

            <p className="text-center text-sm text-[#1f1f1f] uppercase">
              <Link
                className="underline ms-2 hover:text-primary"
                href="/client/pages/forgetpassword">
                نسيت كلمة المرور؟
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
