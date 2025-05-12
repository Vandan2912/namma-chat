import { configureStore } from "@reduxjs/toolkit";
import themeSlice from "./theme-slice";
import chatSlice from "./chat-slice";

const store = configureStore({
  reducer: {
    themeSlice,
    chatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
