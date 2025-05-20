import { useAppSelector } from "@/hooks/useAppDispatch";
import { useEffect } from "react";

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { darkMode } = useAppSelector((state) => state.settings);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return <>{children}</>;
};

export default ThemeProvider;
