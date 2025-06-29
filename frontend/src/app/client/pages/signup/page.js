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
    name: "",
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
    if (!register.name) newErrors.name = "Name is required";
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
    formData.append("name", register.name);
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
        "http://192.168.1.3:5000/api/users",
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
                name="name"
                id="name"
                value={register.name}
                onChange={HandleChange}
                className={`mt-1 block w-full rounded-md border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right`}
                placeholder="أدخل اسمك الكامل"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 text-right">
                  {errors.name}
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

            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 text-right">
                نوع النشاط التجاري
              </label>
              <select
                name="role"
                id="role"
                value={register.role}
                onChange={HandleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right">
                <option value="customer">عميل</option>
                <option value="detaillant">بائع</option>
                <option value="ambulant">بائع متنقل</option>
                <option value="gros">تاجر جملة</option>
              </select>
            </div>

            {register.role !== "customer" && (
              <>
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700 text-right">
                    اسم الشركة
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    value={register.companyName}
                    onChange={HandleChange}
                    className={`mt-1 block w-full rounded-md border ${
                      errors.companyName ? "border-red-500" : "border-gray-300"
                    } p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right`}
                    placeholder="أدخل اسم الشركة"
                  />
                  {errors.companyName && (
                    <p className="mt-1 text-sm text-red-600 text-right">
                      {errors.companyName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="numberTva"
                    className="block text-sm font-medium text-gray-700 text-right">
                    رقم التسجيل
                  </label>
                  <input
                    type="text"
                    name="numberTva"
                    id="numberTva"
                    value={register.numberTva}
                    onChange={HandleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right"
                    placeholder="أدخل رقم ضريبة القيمة المضافة"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 text-right">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={register.phone}
                    onChange={HandleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right"
                    placeholder="أدخل رقم الهاتف"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address.adresse"
                    className="block text-sm font-medium text-gray-700 text-right">
                    العنوان
                  </label>
                  <input
                    type="text"
                    name="address.adresse"
                    id="address.adresse"
                    value={register.address.adresse}
                    onChange={HandleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right"
                    placeholder="أدخل العنوان"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="address.ville"
                      className="block text-sm font-medium text-gray-700 text-right">
                      المدينة
                    </label>
                    <input
                      type="text"
                      name="address.ville"
                      id="address.ville"
                      value={register.address.ville}
                      onChange={HandleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right"
                      placeholder="أدخل المدينة"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address.codePostal"
                      className="block text-sm font-medium text-gray-700 text-right">
                      الرمز البريدي
                    </label>
                    <input
                      type="text"
                      name="address.codePostal"
                      id="address.codePostal"
                      value={register.address.codePostal}
                      onChange={HandleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 p-3 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-right"
                      placeholder="أدخل الرمز البريدي"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                    وثيقة الترخيص/التسجيل
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true">
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                          <span>رفع ملف</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            accept="image/*,application/pdf"
                            onChange={handleFileChange}
                          />
                        </label>
                        <p className="pr-1">أو اسحب وأفلت</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, PDF بحد أقصى 5MB
                      </p>
                    </div>
                  </div>
                  {errors.ConfirmationFile && (
                    <p className="mt-1 text-sm text-red-600 text-right">
                      {errors.ConfirmationFile}
                    </p>
                  )}
                  {previewImage && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2 text-right">
                        معاينة:
                      </p>
                      <img
                        src={previewImage}
                        alt="معاينة الوثيقة"
                        className="max-h-60 rounded-lg shadow-md mx-auto"
                      />
                    </div>
                  )}
                </div>
              </>
            )}
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
