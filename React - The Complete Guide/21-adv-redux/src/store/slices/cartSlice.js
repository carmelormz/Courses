import { createSlice } from '@reduxjs/toolkit';

const CART_INITIAL_STATE = {
  items: [],
  totalQuantity: 0,
};

const addItemFn = (state, action) => {
  const newItem = action.payload;
  const existingItem = state.items.find((item) => item.id === newItem.id);

  if (!existingItem) {
    state.items.push({ ...newItem, quantity: 1, totalPrice: newItem.price });
  } else {
    existingItem.quantity++;
    existingItem.totalPrice += existingItem.price;
  }

  state.totalQuantity++;
};

const removeItemFn = (state, action) => {
  const itemId = action.payload;
  const existingItem = state.items.find((item) => item.id === itemId);

  if (existingItem.quantity === 1) {
    state.items = state.items.filter((item) => item.id !== existingItem.id);
  } else {
    existingItem.quantity--;
    existingItem.totalPrice -= existingItem.price;
  }

  state.totalQuantity--;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: CART_INITIAL_STATE,
  reducers: {
    addItem: addItemFn,
    removeItem: removeItemFn,
  },
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;
