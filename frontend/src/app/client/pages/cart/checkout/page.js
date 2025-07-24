"use client";
import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import { useAppDispatch } from "@/lib/hooks";
import { createAddress } from "@/utils/addressService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setDeliveryFee, setTaxFee } from "@/lib/features/cart/cartReducer";
import { updateUser } from "@/lib/features/auth/authAction";
import NextBreadcrumb from "@/app/client/components/Breadcrumb/Breadcrumb";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

export default function Checkout() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const role = useAppSelector((state) => state.auth.user.role);
  const cart = useAppSelector((state) => state.cart.items);
  const [address, setAddress] = useState({
    name: user?.name || "",
    email: user?.email || "",
    ville: "",
    codePostal: "",
    adresse: "",
    phone: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [order, setOrder] = useState({});
  const totalAmount = useAppSelector((state) => state.cart.totalAmount);
  const totalSaving = useAppSelector((state) => state.cart.totalSaving);
  const totalFinal = useAppSelector((state) => state.cart.totalFinal);
  const tax = useAppSelector((state) => state.cart.tax);
  const includeDeliveryFee = useAppSelector(
    (state) => state.cart.includeDeliveryFee
  );

  // Ensure the initial state matches on server and client
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Initialize address form with user's saved address if available
    if (user?.address) {
      setAddress({
        name: user.name || "",
        email: user.email || "",
        ville: user.address.ville || "",
        codePostal: user.address.codePostal || "",
        adresse: user.address.adresse || "",
        phone: user.address.phone || "",
      });
    }
  }, [user]);

  function handleChange(event) {
    const { name, value } = event.target;
    setAddress((prevFormdata) => ({
      ...prevFormdata,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  }

  function validateForm() {
    const errors = {};
    if (!address.ville) errors.ville = "City is required";
    if (!address.codePostal) errors.codePostal = "Postal code is required";
    if (!address.adresse) errors.adresse = "Address is required";
    if (!address.phone) errors.phone = "Phone number is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleAddress() {
    if (!validateForm()) {
      toast.error("Please fill all the required fields");
      return;
    }

    setIsSubmitting(true);

    if (user) {
      createAddress(address, user._id)
        .then(() => {
          dispatch(updateUser({ address: address }));
          toast.success("Address saved successfully");
          setIsEditing(false);
          setActiveStep(2);
        })
        .catch((error) => {
          toast.error("Failed to save address");
          console.error(error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } else {
      dispatch(updateUser({ address: address }));
      toast.success("Address saved successfully");
      setIsEditing(false);
      setActiveStep(2);
      setIsSubmitting(false);
    }
  }

  async function createOrder() {
    const filterCartItems = cart.map((item) => ({
      product: item.id,
      qty: item.quantity,
      price: item.price,
      image: item.image,
    }));

    const data = {
      user: user._id,
      orderItems: filterCartItems,
      totalAmount: totalAmount,
      totalSaving: totalSaving,
      totalPrice: totalFinal,
      paymentMethod: includeDeliveryFee ? "cash on delivery" : "cash on store",
      shippingPrice: includeDeliveryFee ? 7 : 0,
      tax: tax,
    };
    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        data
      );
      if (response.status === 201) {
        toast.success("Thanks for your purchase, we're getting it ready!");
        setOrder(response.data.data);
        setActiveStep(4);
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  }

  function toggleEditMode() {
    setIsEditing(!isEditing);
  }

  if (!isClient) {
    // Render nothing or a loading state on the server
    return null;
  }

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="flex flex-col items-center justify-start gap-4 py-8 bg-white shadow-sm">
        <h1 className="text-2xl sm:text-3xl text-gray-900 font-bold">
          Checkout
        </h1>
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

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  activeStep >= 1
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500"
                }`}>
                1
              </div>
              <div
                className={`h-1 w-16 sm:w-24 ${
                  activeStep >= 2 ? "bg-primary" : "bg-gray-200"
                }`}></div>
            </div>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  activeStep >= 2
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500"
                }`}>
                2
              </div>
              <div
                className={`h-1 w-16 sm:w-24 ${
                  activeStep >= 3 ? "bg-primary" : "bg-gray-200"
                }`}></div>
            </div>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  activeStep >= 3
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-500"
                }`}>
                3
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2 text-sm">
            <div className="w-24 text-center">الشحن</div>
            <div className="w-24 text-center">الدفع</div>
            <div className="w-24 text-center">مراجعة</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Shipping & Payment */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Shipping Information */}
            {activeStep === 1 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  معلومات الشحن
                </h2>

                {user && user.address?.adresse !== "" && !isEditing ? (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        العنوان المحفوظ
                      </h3>
                      <button
                        onClick={toggleEditMode}
                        className="text-sm text-primary hover:underline">
                        تعديل
                      </button>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-700 font-medium">{user.name}</p>
                      <p className="text-gray-600">{user.address.adresse}</p>
                      <p className="text-gray-600">
                        {user.address.ville}، {user.address.codePostal}
                      </p>
                      <p className="text-gray-600">
                        الهاتف: {user.address.phone}
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveStep(2)}
                      className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-300">
                      المتابعة إلى الدفع
                    </button>
                  </div>
                ) : (
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="ville"
                          className="block text-sm font-medium text-gray-700 mb-1">
                          المدينة*
                        </label>
                        <select
                          id="ville"
                          onChange={handleChange}
                          value={address.ville}
                          name="ville"
                          className={`w-full rounded-lg border ${
                            formErrors.ville
                              ? "border-red-500"
                              : "border-gray-300"
                          } bg-white p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary`}>
                          <option value="">اختر المدينة*</option>
                          <option value="Tunis">تونس</option>
                          <option value="Ariana">أريانة</option>
                          <option value="ben Arous">بن عروس</option>
                          <option value="Manouba">منوبة</option>
                        </select>
                        {formErrors.ville && (
                          <p className="mt-1 text-sm text-red-500">
                            {formErrors.ville}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="codePostal"
                          className="block text-sm font-medium text-gray-700 mb-1">
                          الرمز البريدي*
                        </label>
                        <input
                          type="text"
                          id="codePostal"
                          name="codePostal"
                          value={address.codePostal}
                          onChange={handleChange}
                          className={`w-full rounded-lg border ${
                            formErrors.codePostal
                              ? "border-red-500"
                              : "border-gray-300"
                          } bg-white p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary`}
                          placeholder="أدخل الرمز البريدي"
                        />
                        {formErrors.codePostal && (
                          <p className="mt-1 text-sm text-red-500">
                            {formErrors.codePostal}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="adresse"
                        className="block text-sm font-medium text-gray-700 mb-1">
                        العنوان*
                      </label>
                      <input
                        type="text"
                        id="adresse"
                        name="adresse"
                        value={address.adresse}
                        onChange={handleChange}
                        className={`w-full rounded-lg border ${
                          formErrors.adresse
                            ? "border-red-500"
                            : "border-gray-300"
                        } bg-white p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary`}
                        placeholder="أدخل العنوان"
                      />
                      {formErrors.adresse && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.adresse}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1">
                        رقم الهاتف*
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          +216
                        </span>
                        <input
                          type="text"
                          id="phone"
                          name="phone"
                          value={address.phone}
                          onChange={handleChange}
                          className={`flex-1 rounded-r-lg border ${
                            formErrors.phone
                              ? "border-red-500"
                              : "border-gray-300"
                          } bg-white p-2.5 text-sm text-gray-900 focus:border-primary focus:ring-primary`}
                          placeholder="24-456-789"
                        />
                      </div>
                      {formErrors.phone && (
                        <p className="mt-1 text-sm text-red-500">
                          {formErrors.phone}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-between">
                      {isEditing && (
                        <button
                          type="button"
                          onClick={toggleEditMode}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300">
                          إلغاء
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleAddress}
                        disabled={isSubmitting}
                        className={`${
                          isEditing ? "flex-1 mx-4" : "w-full"
                        } bg-primary text-white py-2.5 px-4 rounded-lg hover:bg-primary-dark transition duration-300 flex items-center justify-center`}>
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24">
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            جاري المعالجة...
                          </>
                        ) : isEditing ? (
                          "تحديث العنوان"
                        ) : (
                          "المتابعة إلى الدفع"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Step 2: Payment Method */}
            {activeStep === 2 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  طريقة الدفع
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary cursor-pointer transition-all duration-300">
                    <label
                      htmlFor="pay-on-delivery"
                      className="block cursor-pointer">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="pay-on-delivery"
                            type="radio"
                            onChange={() => dispatch(setDeliveryFee(true))}
                            name="payment-method"
                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                        <div className="mx-4">
                          <span className="font-medium text-gray-900">
                            الدفع عند الاستلام
                          </span>
                          <p className="text-sm text-gray-500">
                            ادفع عند استلام الطلب (+7 د.ت رسوم توصيل)
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary cursor-pointer transition-all duration-300">
                    <label
                      htmlFor="pay-on-store"
                      className="block cursor-pointer">
                      <div className="flex items-start">
                        <div className="flex h-5 items-center">
                          <input
                            id="pay-on-store"
                            type="radio"
                            onChange={() => dispatch(setDeliveryFee(false))}
                            name="payment-method"
                            className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                          />
                        </div>
                        <div className="mx-4">
                          <span className="font-medium text-gray-900">
                            الدفع في المتجر
                          </span>
                          <p className="text-sm text-gray-500">
                            استلم طلبك وادفع في متجرنا (بدون رسوم توصيل)
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {role === "admin" && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      خيارات الضريبة
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* خيار تضمين الضريبة */}
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-primary cursor-pointer transition-all duration-300">
                        <label
                          htmlFor="include-tax"
                          className="block cursor-pointer">
                          <div className="flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="include-tax"
                                type="radio"
                                onChange={() => dispatch(setTaxFee(1))}
                                name="tax-option"
                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                              />
                            </div>
                            <div className="mx-4">
                              <span className="font-medium text-gray-900">
                                تضمين الضريبة
                              </span>
                              <p className="text-sm text-gray-500">
                                أضف 1 د.ت كضريبة إلى المبلغ الإجمالي
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>

                      {/* خيار عدم تضمين الضريبة */}
                      <div className="border border-gray-200 rounded-lg p-4 hover:border-primary cursor-pointer transition-all duration-300">
                        <label
                          htmlFor="exclude-tax"
                          className="block cursor-pointer">
                          <div className="flex items-start">
                            <div className="flex h-5 items-center">
                              <input
                                id="exclude-tax"
                                type="radio"
                                onChange={() => dispatch(setTaxFee(0))}
                                name="tax-option"
                                className="h-4 w-4 border-gray-300 text-primary focus:ring-primary"
                              />
                            </div>
                            <div className="mx-4">
                              <span className="font-medium text-gray-900">
                                عدم تضمين الضريبة
                              </span>
                              <p className="text-sm text-gray-500">
                                لا توجد ضريبة إضافية
                              </p>
                            </div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setActiveStep(1)}
                    className="px-2 sm:px-4 text-sm py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300">
                    العودة إلى الشحن
                  </button>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-2 sm:px-4 text-sm py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition duration-300">
                    المتابعة إلى المراجعة
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Order Review */}
            {activeStep === 3 && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  مراجعة الطلب
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      عنوان الشحن
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 font-medium">{user.name}</p>
                      <p className="text-gray-600">{user.address.adresse}</p>
                      <p className="text-gray-600">
                        {user.address.ville}, {user.address.codePostal}
                      </p>
                      <p className="text-gray-600">
                        الهاتف: {user.address.phone}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      طريقة الدفع
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 font-medium">
                        {includeDeliveryFee
                          ? "الدفع عند التسليم"
                          : "الدفع في المتجر"}
                      </p>
                      <p className="text-gray-600">
                        {includeDeliveryFee
                          ? "سوف تدفع عند استلام طلبك"
                          : "سوف تدفع عند استلام طلبك من المتجر"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      عناصر الطلب
                    </h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              المنتج
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              الكمية
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                              السعر
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {cart.map((item) => (
                            <tr key={item.id}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="h-10 w-10 flex-shrink-0">
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      width={40}
                                      height={40}
                                      className="rounded-md object-cover"
                                    />
                                  </div>
                                  <div className="mx-4">
                                    <div className="text-sm font-medium text-gray-900">
                                      {item.name}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                {item.quantity}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                                {item.price} د.ت
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setActiveStep(2)}
                      className="px-4 py-2 border text-sm border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300">
                      العودة إلى الدفع
                    </button>
                    <button
                      onClick={createOrder}
                      className="px-4 py-2 bg-primary text-sm text-white rounded-lg hover:bg-primary-dark transition duration-300">
                      تأكيد الطلب
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activeStep === 4 && (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-green-50 px-6 py-4 border-b border-green-100">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h2 className="text-xl font-semibold text-green-800">
                        تم تأكيد الطلب!
                      </h2>
                      <p className="text-sm text-green-700">
                        تم تقديم طلبك بنجاح.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      تفاصيل الطلب
                    </h3>
                    <p className="text-gray-600">
                      طلبك{" "}
                      <span className="font-semibold">#{order.orderId}</span>
                      سوف يتم معالجته خلال 24 ساعة خلال أيام العمل. سنقوم
                      بإعلامك عبر البريد الإلكتروني بمجرد شحن طلبك.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                        معلومات الطلب
                      </h4>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-600">تاريخ الطلب</dt>
                          <dd className="text-sm font-medium text-gray-900">
                            {new Date(order.createdAt).toLocaleString()}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-600">طريقة الدفع</dt>
                          <dd className="text-sm font-medium text-gray-900 capitalize">
                            {order.paymentMethod}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-600">
                            المبلغ الإجمالي
                          </dt>
                          <dd className="text-sm font-medium text-gray-900">
                            {order.totalPrice?.toFixed(2)} د.ت
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                        معلومات التوصيل
                      </h4>
                      <dl className="space-y-2">
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-600">الاسم</dt>
                          <dd className="text-sm font-medium text-gray-900">
                            {user?.name}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-600">العنوان</dt>
                          <dd className="text-sm font-medium text-gray-900">
                            {user?.address
                              ? `${user.address.ville}، ${user.address.adresse}، ${user.address.codePostal}`
                              : "غير متوفر"}
                          </dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-600">الهاتف</dt>
                          <dd className="text-sm font-medium text-gray-900">
                            {user?.address?.phone || "غير متوفر"}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/client/pages/myaccount/myorder"
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                      تتبع طلبك
                    </Link>
                    <Link
                      href="/"
                      className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                      متابعة التسوق
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 text-right">
                ملخص الطلب
              </h2>

              <div className="space-y-4 text-right">
                <div className="flex justify-between">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span className="font-medium text-gray-900">
                    {totalAmount.toFixed(2)} د.ت
                  </span>
                </div>

                {totalSaving > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>التوفير</span>
                    <span className="font-medium">
                      -{totalSaving.toFixed(2)} د.ت
                    </span>
                  </div>
                )}

                {includeDeliveryFee && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">رسوم التوصيل</span>
                    <span className="font-medium text-gray-900">7.00 د.ت</span>
                  </div>
                )}

                {tax === 1 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">الضريبة</span>
                    <span className="font-medium text-gray-900">1.00 د.ت</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                      الإجمالي
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      {totalFinal.toFixed(2)} د.ت
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-right">
                <div className="flex items-center text-sm text-gray-500 justify-end">
                  <svg
                    className="h-5 w-5 text-gray-400 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>دفع آمن</span>
                </div>
              </div>

              {!token && (
                <div className="mt-6 p-4 bg-amber-50 rounded-lg text-sm text-amber-800 text-right">
                  <p>
                    يجب عليك تسجيل الدخول لإتمام عملية الشراء.{" "}
                    <Link
                      href="/client/pages/signin"
                      className="font-medium text-amber-800 underline hover:no-underline">
                      تسجيل الدخول أو إنشاء حساب
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
