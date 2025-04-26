"use client";

import { RootState } from "@/store/store";
import { IThemeInitialState } from "@/store/theme-slice/module/initial-state";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ThemeColorUpdater() {
  const { topBarColor } = useSelector<RootState>((state) => state.themeSlice) as IThemeInitialState;

  useEffect(() => {
    let meta = document.querySelector("meta[name=theme-color]");
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", topBarColor);
  }, [topBarColor]);

  return null;
}
