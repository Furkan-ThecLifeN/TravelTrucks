import { configureStore } from '@reduxjs/toolkit';
import campersReducer from './campersSlice.js';

export const store = configureStore({
  reducer: {
    campers: campersReducer,
  },
});