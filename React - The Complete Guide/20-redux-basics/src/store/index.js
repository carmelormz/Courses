import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './slices/counterSlice.js';
import authReducer from './slices/authSlice.js';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});

export default store;
