"use client";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  totalSaving: 0,
  includeDeliveryFee: false,
  tax: 0, // Default to 0 (not included)
  totalFinal: 0,
  isOpen: false,
};

const calculateTotalFinal = (
  totalAmount,
  totalSaving,
  tax,
  includeDeliveryFee
) => {
  const deliveryFee = includeDeliveryFee ? 7 : 0;
  return totalAmount - totalSaving + deliveryFee + tax;
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem._id);

      const itemPrice = newItem.prix_passager;
      const itemDiscount = newItem.discount
        ? (newItem.price * newItem.discount) / 100
        : 0;
      const itemQuantity = newItem.quantity || 1;

      if (existingItem) {
        existingItem.quantity += itemQuantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        state.items.push({
          id: newItem._id,
          price: itemPrice,
          image: newItem.image || "",
          discount: itemDiscount,
          quantity: itemQuantity,
          totalPrice: itemPrice * itemQuantity,
          name: newItem.productName,
        });
      }

      // Recalculate totals
      state.totalQuantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      state.totalSaving = state.items.reduce(
        (total, item) => total + item.discount * item.quantity,
        0
      );

      state.totalFinal = calculateTotalFinal(
        state.totalAmount,
        state.totalSaving,
        state.tax,
        state.includeDeliveryFee
      );
    },

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.totalSaving -= existingItem.discount * existingItem.quantity;
        state.items = state.items.filter((item) => item.id !== id);
      }

      state.totalFinal = calculateTotalFinal(
        state.totalAmount,
        state.totalSaving,
        state.tax,
        state.includeDeliveryFee
      );
    },

    increaseItemQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        state.totalQuantity += 1;
        state.totalAmount += existingItem.price;
        state.totalSaving += existingItem.discount;
      }

      state.totalFinal = calculateTotalFinal(
        state.totalAmount,
        state.totalSaving,
        state.tax,
        state.includeDeliveryFee
      );
    },

    setItemQuantity(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        state.totalQuantity = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        state.totalSaving = state.items.reduce(
          (total, item) => total + item.discount * item.quantity,
          0
        );
      }

      state.totalFinal = calculateTotalFinal(
        state.totalAmount,
        state.totalSaving,
        state.tax,
        state.includeDeliveryFee
      );
    },

    decreaseItemQuantity(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity -= 1;
          existingItem.totalPrice = existingItem.price * existingItem.quantity;
          state.totalQuantity -= 1;
          state.totalAmount -= existingItem.price;
          state.totalSaving -= existingItem.discount;
        } else {
          state.items = state.items.filter((item) => item.id !== id);
          state.totalQuantity -= 1;
          state.totalAmount -= existingItem.price;
          state.totalSaving -= existingItem.discount;
        }
      }

      state.totalFinal = calculateTotalFinal(
        state.totalAmount,
        state.totalSaving,
        state.tax,
        state.includeDeliveryFee
      );
    },

    // SET delivery fee explicitly
    setDeliveryFee(state, action) {
      state.includeDeliveryFee = action.payload; // true or false
      state.totalFinal = calculateTotalFinal(
        state.totalAmount,
        state.totalSaving,
        state.tax,
        state.includeDeliveryFee
      );
    },

    // SET tax explicitly
    setTaxFee(state, action) {
      state.tax = action.payload; // 1 or 0
      state.totalFinal = calculateTotalFinal(
        state.totalAmount,
        state.totalSaving,
        state.tax,
        state.includeDeliveryFee
      );
    },

    toggleCart(state) {
      state.isOpen = !state.isOpen;
    },

    clearCart(state) {
      Object.assign(state, initialState);
    },

    setCart(state, action) {
      return action.payload;
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  setDeliveryFee,
  setTaxFee,
  toggleCart,
  clearCart,
  setItemQuantity,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
