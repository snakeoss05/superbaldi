"use client";
import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/lib/hooks";
import {
  toggleNotificationBar,
  clearNotifications,
  markAsRead,
  markAllAsRead,
  setNotifications,
} from "@/lib/features/notifications/notificationSlice";
import {
  fetchNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/utils/notifications";

export default function NotificationSidebar() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = useAppSelector((state) => state.auth.token);
  const role = useAppSelector((state) => state.auth.user?.role);
  const isOpen = useAppSelector((state) => state.notifications?.isOpen);
  const notifications = useAppSelector(
    (state) => state.notifications.notifications
  );
  const unreadCount = useAppSelector(
    (state) => state.notifications.unreadCount
  );

  // Early return if not on client or not ADMIN

  const handleNotificationClick = (id) => {
    dispatch(markAsRead(id));
    markNotificationAsRead(id);
  };

  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
    markAllNotificationsAsRead();
  };

  useEffect(() => {
    function pollNotifications() {
      fetchNotifications()
        .then((notifications) => {
          dispatch(setNotifications(notifications));
        })
        .catch((error) => console.error(error));
    }
    if (token && role === "ADMIN") {
      const intervalId = setInterval(pollNotifications, 5000);
      return () => clearInterval(intervalId);
    }
  }, []);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!token || role !== "ADMIN") {
    return null;
  }

  return (
    <div
      className="fixed inset-0 overflow-hidden  pointer-events-none"
      style={{ zIndex: 9999 }}>
      <div
        className={`absolute inset-y-0 right-0 max-w-full flex transform transition-all ease-in-out duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}>
        <div className="w-screen max-w-sm pointer-events-auto">
          <div className="h-full flex flex-col bg-white shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-6 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Notifications {unreadCount > 0 && `(${unreadCount})`}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleMarkAllAsRead()}
                  className="p-1 text-gray-400 hover:text-gray-500"
                  title="Mark all as read">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </button>
                <button
                  onClick={() => dispatch(clearNotifications())}
                  className="p-1 text-gray-400 hover:text-gray-500"
                  title="Clear all">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
                <button
                  onClick={() => dispatch(toggleNotificationBar())}
                  className="p-1 text-gray-400 hover:text-gray-500"
                  title="Close">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
            </div>

            {/* Notification list */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No notifications
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {notifications.length > 0 &&
                    notifications.map((notification) => (
                      <li
                        key={notification._id}
                        className={`px-4 py-4 hover:bg-gray-50 cursor-pointer ${
                          !notification.isRead ? "bg-blue-50" : ""
                        }`}
                        onClick={() =>
                          handleNotificationClick(notification._id)
                        }>
                        <div className="flex items-start">
                          <div className="flex-shrink-0 pt-0.5"></div>
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between">
                              <p
                                className={`text-sm font-medium ${
                                  !notification.isRead
                                    ? "text-gray-900"
                                    : "text-gray-600"
                                }`}>
                                {notification.type}
                              </p>
                              <p className="text-xs text-gray-500">
                                {notification.createdAt}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {notification.message}
                            </p>
                            {notification.priority && (
                              <span
                                className={`mt-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                  notification.priority === "high"
                                    ? "bg-red-100 text-red-800"
                                    : notification.priority === "medium"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                }`}>
                                {notification.priority}
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
