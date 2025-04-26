import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./theme-slice";

const store = configureStore({
  reducer: {
    themeSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
