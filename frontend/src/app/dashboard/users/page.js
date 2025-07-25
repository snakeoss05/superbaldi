"use client";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Pagination from "@/app/client/components/Pagination/Pagination";
import { toast } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import CustomerProfile from "../orders/CustomerProfile";
import { set } from "mongoose";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openCustomerProfile, setOpenCustomerProfile] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/notverified?status=true&page=${page}&limit=8`,
          {
            withCredentials: true,
          }
        );
        setUsers(res.data.results);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to fetch users");
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchUsers = async () => {
      if (name.length > 2) {
        const queryParams = new URLSearchParams({
          page: page.toString(),
          limit: "8",
          search: name,
        });

        try {
          const res = await axios.get(
            `http://localhost:5000/api/users?${queryParams.toString()}`,
            {
              withCredentials: true,
            }
          );

          setUsers(res.data.results);
          setTotalPages(res.data.totalPages);
        } catch (error) {
          console.error("Error fetching users:", error);
          toast.error("Failed to fetch users");
        }
      }
    };

    fetchUsers();
  }, [name]);
  const handleUpdateStatus = async (id) => {
    const updatedUsers = users.map((user) => {
      if (user._id === id) {
        return { ...user, isVerified: true };
      }
      return user;
    });
    setUsers(updatedUsers);
    const user = users.find((user) => user._id === id);
    try {
      await axios.put(`http://localhost:5000/api/admin/update/${id}`, user, {
        withCredentials: true,
      });
      toast.success("User verified successfully");
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Failed to update user status");
    }
  };
  function handleCustomerSearch(id) {
    setSelectedUserId(id);
    setOpenCustomerProfile(true);
  }
  return (
    <div dir="ltr">
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-semibold mb-3">
            Sélectionnez un utilisateur
          </h2>
        </div>

        <div className="relative">
          <input
            type="text"
            id="Search"
            onChange={(e) => setName(e.target.value)}
            placeholder="Search for a user..."
            className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 focus:border-secondary"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16.6725 16.6412L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <h2 className="text-2xl font-semibold my-4">
          Utilisateurs en attente de vérification
        </h2>
        <div className="overflow-x-auto my-4 rounded-xl w-full bg-white ">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  phone number
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  status
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confirmation File
                </th>
                <th
                  scope="col"
                  className="whitespace-nowrap px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50 transition my-2">
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">
                    {user.address?.phone || "—"}
                  </td>
                  <td className="py-2 px-4 border-b capitalize">{user.role}</td>
                  <td className="py-2 px-4 border-b">
                    {user.companyName || "—"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center space-x-3">
                      {user?.isVerified ? (
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
                        <p className="font-medium">
                          {user?.isVerified ? "Verified" : "Not Verified"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {user.ConfirmationFile ? (
                      <a
                        href={user.ConfirmationFile}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline">
                        View File
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="flex flex-row gap-2">
                    <button
                      onClick={() => handleUpdateStatus(user._id)}
                      className="bg-green-600 text-white px-3 text-sm uppercase py-1 rounded hover:bg-green-700 transition">
                      Verify
                    </button>
                    <button
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                      onClick={() => handleCustomerSearch(user._id)}>
                      <svg
                        className="h-8 w-8 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <g id="SVGRepo_iconCarrier">
                          {" "}
                          <path
                            d="M3 14C3 9.02944 7.02944 5 12 5C16.9706 5 21 9.02944 21 14M17 14C17 16.7614 14.7614 19 12 19C9.23858 19 7 16.7614 7 14C7 11.2386 9.23858 9 12 9C14.7614 9 17 11.2386 17 14Z"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />{" "}
                        </g>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
        <CustomerProfile
          isOpen={openCustomerProfile}
          onClose={() => setOpenCustomerProfile(false)}
          id={selectedUserId}
        />
      </div>
    </div>
  );
}
