// features/notifications/notificationSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { set } from "mongoose";

const initialState = {
  notifications: [],
  unreadCount: 0,
  isOpen: false,
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
      state.unreadCount = action.payload.filter((n) => !n.read).length;
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find(
        (n) => n.id === action.payload
      );
      if (notification) {
        notification.read = true;
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((notification) => {
        notification.read = true;
      });
      state.unreadCount = 0;
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    toggleNotificationBar: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const {
  setNotifications,
  markAsRead,
  clearNotifications,
  markAllAsRead,
  toggleNotificationBar,
} = notificationSlice.actions;
export default notificationSlice.reducer;
