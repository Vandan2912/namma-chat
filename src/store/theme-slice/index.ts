import { createSlice } from "@reduxjs/toolkit";
import { ThemeInitialState } from "./module/initial-state";
import { asyncUpdateThemeReducer } from "./extra-reducer";

const themeSlice = createSlice({
  name: "themeSlice",
  initialState: ThemeInitialState,
  reducers: {
    updateThemeReducer: asyncUpdateThemeReducer,
  },
});

export const { updateThemeReducer } = themeSlice.actions;
export default themeSlice.reducer;
