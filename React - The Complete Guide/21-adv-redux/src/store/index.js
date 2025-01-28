import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './slices/cartSlice';
import uiSlice from './slices/uiSlice';

const store = configureStore({
  reducer: {
    cart: cartSlice,
    ui: uiSlice,
  },
});

export default store;
