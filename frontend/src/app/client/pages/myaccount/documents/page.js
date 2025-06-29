"use client";

import React, { useState, useEffect } from "react";
import { useAppSelector } from "@/lib/hooks";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

export default function Documents() {
  const user = useAppSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(true);
  const [confirmationFile, setConfirmationFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConfirmationFile = async () => {
      try {
        setLoading(true);
        // The confirmation file URL is stored in the user object
        if (user && user.ConfirmationFile) {
          setConfirmationFile(user.ConfirmationFile);
        } else {
          setError("No confirmation file found");
        }
      } catch (err) {
        console.error("Error fetching confirmation file:", err);
        setError("Failed to load confirmation file");
        toast.error("Failed to load confirmation file");
      } finally {
        setLoading(false);
      }
    };

    fetchConfirmationFile();
  }, [user]);

  const handleDownload = () => {
    if (confirmationFile) {
      // Create a temporary link to download the file
      const link = document.createElement("a");
      link.href = confirmationFile;
      link.target = "_blank";
      link.download = `confirmation_file_${user.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          My Documents
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          View and download your confirmation documents
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No Documents Available
              </h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                {error}
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="mb-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  Confirmation Document
                </h2>
                <p className="text-gray-500 dark:text-gray-400">
                  This is your confirmation document for your account
                </p>
              </div>

              <div className="w-full max-w-2xl mb-6">
                {confirmationFile && (
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    {confirmationFile.endsWith(".pdf") ? (
                      <div className="bg-gray-100 dark:bg-gray-700 p-8 flex flex-col items-center justify-center h-96">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-24 w-24 text-gray-400 mb-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <p className="text-gray-500 dark:text-gray-400">
                          PDF Document
                        </p>
                      </div>
                    ) : (
                      <div className="relative h-96 w-full">
                        <Image
                          src={confirmationFile}
                          alt="Confirmation Document"
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download Document
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
