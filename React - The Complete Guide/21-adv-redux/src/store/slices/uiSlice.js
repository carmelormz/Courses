import { createSlice } from '@reduxjs/toolkit';

const UI_SLICE_INITIAL_STATE = {
  showCart: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState: UI_SLICE_INITIAL_STATE,
  reducers: {
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});

export const { toggleCart } = uiSlice.actions;

export default uiSlice.reducer;
