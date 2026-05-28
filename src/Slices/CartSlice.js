import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {

    // ADD TO CART
    addToCart: (state, action) => {
      const item = action.payload;

      const existingItem = state.cartItems.find(
        (product) => product.prodId === item._id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },

    // REMOVE ITEM
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.prodId !== action.payload
      );
    },

    // INCREASE QUANTITY
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (product) => product.prodId === action.payload
      );

      if (item) {
        if(item.quantity<item.stock){
          item.quantity += 1;
        }
      }
    },

    // DECREASE QUANTITY
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(
        (product) => product.prodId === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    // CLEAR CART
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;