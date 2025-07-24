"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { login } from "@/lib/features/auth/authAction";
import { useAppDispatch } from "@/lib/hooks";

export default function SignIn() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
    ConfirmationFile: null,
    companyName: "",
    phone: "",
    address: {
      adresse: "",
      ville: "",
      codePostal: "",
    },
    numberTva: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error("متفاوت الحجم المسموح به هو 5MB");
        return;
      }
      setRegister((prev) => ({
        ...prev,
        ConfirmationFile: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  }

  const validateForm = () => {
    const newErrors = {};
    if (!register.username) newErrors.username = "username is required";
    if (!register.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(register.email))
      newErrors.email = "Invalid email format";
    if (!register.password) newErrors.password = "Password is required";
    else if (register.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (register.role !== "customer" && !register.companyName)
      newErrors.companyName = "Company name is required";
    if (register.role !== "customer" && !register.ConfirmationFile)
      newErrors.ConfirmationFile = "Confirmation file is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function RegisterForm(e) {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("username", register.username);
    formData.append("email", register.email);
    formData.append("password", register.password);
    formData.append("role", register.role);
    formData.append("companyName", register.companyName);
    formData.append("phone", register.phone);
    formData.append("adresse", register.address.adresse);
    formData.append("ville", register.address.ville);
    formData.append("codePostal", register.address.codePostal);
    formData.append("numberTva", register.numberTva);
    if (register.ConfirmationFile) {
      formData.append("ConfirmationFile", register.ConfirmationFile);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        toast.success("تم التسجيل بنجاح");
        router.push("/client/pages/signin");
      } else {
        toast.error(response.data.message || "فشل التسجيل");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "فشل التسجيل");
    } finally {
      setLoading(false);
    }
  }

  function HandleChange(event) {
    const { name, value } = event.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setRegister((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setRegister((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto w-full max-w-xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary">
            التسجيل في وولمارت
          </h1>
          <p className="mt-2 text-gray-600">
            انضم إلى شبكة موردي وولمارت وقم بتنمية عملك
          </p>
        </div>

        <form className="bg-white rounded-lg shadow-xl p-8 space-y-6 border border-gray-100">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 text-right">
                الاسم الكامل
              </label>
              <input
                type="text"
                name="username"
                id="username"
                value={register.username}
                onChange={HandleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right`}
                placeholder="أدخل اسمك الكامل"
              />
              {errors.username && (
                <p className="mt-1 text-sm text-red-600 text-right">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 text-right">
                البريد الإلكتروني
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={register.email}
                onChange={HandleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right`}
                placeholder="أدخل بريدك الإلكتروني"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 text-right">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 text-right">
                كلمة المرور
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={register.password}
                  onChange={HandleChange}
                  className={`mt-1 block w-full rounded-md border ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right`}
                  placeholder="أدخل كلمة المرور"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  {showPassword ? (
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 text-right">
                  {errors.password}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              onClick={RegisterForm}
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "جاري التسجيل..." : "تسجيل"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              هل لديك حساب بالفعل؟{" "}
              <Link
                href="/client/pages/signin"
                className="font-medium text-primary hover:text-blue-500">
                تسجيل الدخول
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
// ... existing code ...
