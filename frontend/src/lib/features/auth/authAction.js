"use client";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  token: typeof window !== "undefined" ? Cookies.get("token") || "" : null,
  user:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user") || "{}")
      : {},
};

const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { token, user } = action.payload;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      Cookies.set("token", token);
      state.token = token;
      state.user = user;
    },
    logout(state) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      Cookies.remove("token");
      state.token = null;
      state.user = {};
    },
    updateUser(state, action) {
      const updatedUser = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      state.user = updatedUser;
    },
  },
});

export const { login, logout, updateUser } = auth.actions;

export default auth.reducer;
