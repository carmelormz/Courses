import { createSlice } from '@reduxjs/toolkit';

const UI_SLICE_INITIAL_STATE = {
  showCart: false,
  notification: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: UI_SLICE_INITIAL_STATE,
  reducers: {
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
    showNotification: (state, action) => {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const { toggleCart, showNotification } = uiSlice.actions;

export default uiSlice.reducer;
