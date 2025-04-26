import { IThemeInitialState } from "../module/initial-state"; // Adjust the path to where the interface is located

export const asyncUpdateThemeReducer = (
  state: IThemeInitialState,
  action: {
    payload: string;
  }
) => {
  state.topBarColor = action.payload;
};
