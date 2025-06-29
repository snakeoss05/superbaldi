"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  id: null,
};

const QuickView = createSlice({
  name: "QuickView",
  initialState,
  reducers: {
    openQuikView(state, action) {
      state.isOpen = true;
      state.id = action.payload;
    },
    closeQuikView(state) {
      state.isOpen = false;
      state.id = null;
    },
  },
});

export const { openQuikView, closeQuikView } = QuickView.actions;

export default QuickView.reducer;
