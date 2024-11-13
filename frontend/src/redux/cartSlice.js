import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += action.payload.price;
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        });
      }
      state.totalQuantity = Number(state.totalQuantity) + 1;
      state.totalPrice = Number(state.totalPrice) + Number(action.payload.price);
    },
    removeItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
    
      if (existingItem) {
        const itemPrice = Number(action.payload.price) || 0;
        const itemQuantity = Number(existingItem.quantity) || 0;
        const itemTotalPrice = Number(existingItem.totalPrice) || 0;
        const totalQuantity = Number(state.totalQuantity) || 0;
        const totalPrice = Number(state.totalPrice) || 0;
    
        if (itemQuantity === 1) {
          state.items = state.items.filter((item) => item.id !== action.payload.id);
        } else {
          existingItem.quantity = itemQuantity - 1;
          existingItem.totalPrice = itemTotalPrice - itemPrice;
        }
    
        state.totalQuantity = totalQuantity - 1;
        state.totalPrice = totalPrice - itemPrice;
      }
    },
    clearItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
    
      if (existingItem) {
        const itemPrice = Number(action.payload.price) || 0;
        const itemQuantity = Number(existingItem.quantity) || 0;
        const itemTotalPrice = Number(existingItem.totalPrice) || 0;
        const totalQuantity = Number(state.totalQuantity) || 0;
        const totalPrice = Number(state.totalPrice) || 0;
    
        state.items = state.items.filter((item) => item.id !== action.payload.id);
        state.totalQuantity = totalQuantity - itemQuantity;
        state.totalPrice = totalPrice - itemTotalPrice;
      }
    }
    ,
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, clearItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
