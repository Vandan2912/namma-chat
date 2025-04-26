import { AppDispatch } from "@/store/store";
import { updateThemeReducer } from "@/store/theme-slice";
import { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";

// add usememo to prevent unnecessary re-renders
export const useTopBarColour = (color: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const memoizedColor = useMemo(() => color, [color]);

  useEffect(() => {
    dispatch(updateThemeReducer(memoizedColor));
  }, [dispatch, memoizedColor]);
};
