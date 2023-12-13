import { useAppDispatch, useAppSelector } from "../Redux/store/store";
import { COLD_COLOR, HOT_COLOR } from "../themes";
import { StatusBar } from "react-native";
import { useEffect } from "react";
import { changeThemeMode } from "../Redux/slices";

export const useTheme = () => {
  const appDispatch = useAppDispatch();
  const { isHotMode } = useAppSelector(state => state.root.app);
  useEffect(() => {
    StatusBar.setBarStyle(isHotMode ? "dark-content" : "light-content");
  }, [isHotMode]);
  return {
    colors: isHotMode ? HOT_COLOR : COLD_COLOR,
    changeThemeMode: () => {
      return appDispatch(changeThemeMode());
    },
    isHotMode,
  };
};
