"use client";
import React, { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "@/utils/auth";
import Loading from "@/app/loading";

export default function CustomerProfile({ isOpen, onClose, id }) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    if (id) {
      setLoading(true);
      getUserProfile(id).then((data) => {
        setCustomer(data.results);
        setEditedData({
          ...data.results,
          address: { ...data.results.address },
        });
        setLoading(false);
      });
    }
  }, [id]);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setEditedData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setEditedData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const updatedCustomer = await updateUserProfile(id, editedData);

      if (updatedCustomer) {
        setCustomer(updatedCustomer.results);
        setEditedData({
          ...updatedCustomer,
          address: { ...updatedCustomer.address },
        });
      }
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !id) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
      style={{ zIndex: 99000 }}>
      <div className="relative bg-white max-h-[90vh] overflow-y-auto rounded-lg shadow-lg w-full max-w-4xl mx-auto p-6">
        {loading ? (
          <Loading />
        ) : (
          <div>
            <button
              className="absolute text-lg top-4 right-4 text-gray-600 hover:text-gray-900"
              onClick={onClose}>
              &times;
            </button>

            <div className="space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Customer Profile
                </h2>
                <div className="flex items-center gap-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      customer?.role === "ADMIN"
                        ? "bg-purple-100 text-purple-800"
                        : customer?.role === "customer"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}>
                    {customer?.role}
                  </span>
                  {editing ? (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSave}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition">
                        Save
                      </button>
                      <button
                        onClick={handleEditToggle}
                        className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={handleEditToggle}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700 border-b pb-2">
                    Basic Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z"
                          fill="currentColor"
                        />
                      </svg>
                      <div className="w-full">
                        <p className="text-sm text-gray-500">Name</p>
                        {editing ? (
                          <input
                            type="text"
                            name="name"
                            value={editedData.name || ""}
                            onChange={handleInputChange}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          <p className="font-medium">{customer?.name}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"
                          fill="currentColor"
                        />
                      </svg>
                      <div className="w-full">
                        <p className="text-sm text-gray-500">Email</p>
                        {editing ? (
                          <input
                            type="email"
                            name="email"
                            value={editedData.email || ""}
                            onChange={handleInputChange}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          <p className="font-medium">{customer?.email}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5C20.55 15.5 21 15.95 21 16.5V20C21 20.55 20.55 21 20 21C10.61 21 3 13.39 3 4C3 3.45 3.45 3 4 3H7.5C8.05 3 8.5 3.45 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z"
                          fill="currentColor"
                        />
                      </svg>
                      <div className="w-full">
                        <p className="text-sm text-gray-500">Phone</p>
                        {editing ? (
                          <input
                            type="tel"
                            name="address.phone"
                            value={editedData.address?.phone || ""}
                            onChange={handleInputChange}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          <p className="font-medium">
                            {customer?.address?.phone || "Not provided"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-700 border-b pb-2">
                    Address Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
                          fill="currentColor"
                        />
                      </svg>
                      <div className="w-full">
                        <p className="text-sm text-gray-500">Street Address</p>
                        {editing ? (
                          <input
                            type="text"
                            name="address.adresse"
                            value={editedData.address?.adresse || ""}
                            onChange={handleInputChange}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          <p className="font-medium">
                            {customer?.address?.adresse || "Not provided"}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M15 11V5L4 9V15L15 19V13H21V11H15Z"
                          fill="currentColor"
                        />
                      </svg>
                      <div className="w-full">
                        <p className="text-sm text-gray-500">City</p>
                        {editing ? (
                          <input
                            type="text"
                            name="address.ville"
                            value={editedData.address?.ville || ""}
                            onChange={handleInputChange}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          <p className="font-medium">
                            {customer?.address?.ville || "Not provided"}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V6H20V18ZM6 10H18V12H6V10ZM6 14H14V16H6V14Z"
                          fill="currentColor"
                        />
                      </svg>
                      <div className="w-full">
                        <p className="text-sm text-gray-500">Postal Code</p>
                        {editing ? (
                          <input
                            type="text"
                            name="address.codePostal"
                            value={editedData.address?.codePostal || ""}
                            onChange={handleInputChange}
                            className="w-full p-1 border rounded"
                          />
                        ) : (
                          <p className="font-medium">
                            {customer?.address?.codePostal || "Not provided"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Business Information */}
                {(customer?.role === "detaillant" ||
                  customer?.role === "gros" ||
                  customer?.role === "ambulant") && (
                  <div className="space-y-4 md:col-span-2">
                    <h3 className="text-lg font-medium text-gray-700 border-b pb-2">
                      Business Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-3">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 7V3H2V21H22V7H12ZM6 19H4V17H6V19ZM6 15H4V13H6V15ZM6 11H4V9H6V11ZM6 5H4V7H6V5ZM10 19H8V17H10V19ZM10 15H8V13H10V15ZM10 11H8V9H10V11ZM10 5H8V7H10V5ZM20 19H12V17H14V15H12V13H14V11H12V9H20V19ZM18 11H16V13H18V11ZM18 15H16V17H18V15Z"
                            fill="currentColor"
                          />
                        </svg>
                        <div className="w-full">
                          <p className="text-sm text-gray-500">Company Name</p>
                          {editing ? (
                            <input
                              type="text"
                              name="companyName"
                              value={editedData.companyName || ""}
                              onChange={handleInputChange}
                              className="w-full p-1 border rounded"
                            />
                          ) : (
                            <p className="font-medium">
                              {customer?.companyName || "Not provided"}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V6H20V18ZM6 10H18V12H6V10ZM6 14H14V16H6V14Z"
                            fill="currentColor"
                          />
                        </svg>
                        <div className="w-full">
                          <p className="text-sm text-gray-500">VAT Number</p>
                          {editing ? (
                            <input
                              type="text"
                              name="numberTva"
                              value={editedData.numberTva || ""}
                              onChange={handleInputChange}
                              className="w-full p-1 border rounded"
                            />
                          ) : (
                            <p className="font-medium">
                              {customer?.numberTva || "Not provided"}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Account Status */}
                <div className="space-y-4 md:col-span-2">
                  <h3 className="text-lg font-medium text-gray-700 border-b pb-2">
                    Account Status
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11.8 10.9C9.53 10.31 8.8 9.7 8.8 8.75C8.8 7.66 9.81 6.9 11.5 6.9C13.28 6.9 13.94 7.75 14 9H16.21C16.14 7.28 15.09 5.7 13 5.19V3H10V5.16C8.06 5.58 6.5 6.84 6.5 8.77C6.5 11.08 8.41 12.23 11.2 12.9C13.7 13.5 14.2 14.38 14.2 15.31C14.2 16 13.71 17.1 11.5 17.1C9.44 17.1 8.63 16.18 8.5 15H6.32C6.44 17.19 8.08 18.42 10 18.83V21H13V18.85C14.95 18.5 16.5 17.35 16.5 15.3C16.5 12.46 13.07 11.5 11.8 10.9Z"
                          fill="currentColor"
                        />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500">Credit Balance</p>
                        <p className="font-medium">
                          {customer?.credit || 0} DT
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {customer?.isVerified ? (
                        <svg
                          className="w-5 h-5 text-green-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
                            fill="currentColor"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 text-red-500"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM17 15.59L15.59 17L12 13.41L8.41 17L7 15.59L10.59 12L7 8.41L8.41 7L12 10.59L15.59 7L17 8.41L13.41 12L17 15.59Z"
                            fill="currentColor"
                          />
                        </svg>
                      )}
                      <div>
                        <p className="text-sm text-gray-500">
                          Verification Status
                        </p>
                        <p className="font-medium">
                          {customer?.isVerified ? "Verified" : "Not Verified"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5 text-gray-500"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM7 10H9V17H7V10ZM11 7H13V17H11V7ZM15 13H17V17H15V13Z"
                          fill="currentColor"
                        />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-500">Member Since</p>
                        <p className="font-medium">
                          {new Date(customer?.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
