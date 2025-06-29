// api/notifications.js
import axios from "axios";

const API_BASE = "http://192.168.1.3:5000/api/notifications";

export const fetchStockNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch notifications"
    );
  }
};

export const markNotificationAsRead = async (id) => {
  try {
    const response = await axios.put(`${API_BASE}/${id}/read`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to mark notification as read"
    );
  }
};

export const markAllNotificationsAsRead = async () => {
  try {
    const response = await axios.put(`${API_BASE}/read-all`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        "Failed to mark all notifications as read"
    );
  }
};

// Polling function for updates
export const fetchNotifications = async () => {
  try {
    const response = await axios.get(`${API_BASE}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch notifications"
    );
  }
};
