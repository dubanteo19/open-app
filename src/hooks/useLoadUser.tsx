import { useAuthMeQuery } from "@/features/auth/api";
import { logout, setUser } from "@/features/auth/slice";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useAppDispatch";

export function useLoadUserFromToken() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = localStorage.getItem("accessToken");
  const { data, isLoading, isError, isSuccess } = useAuthMeQuery(undefined, {
    skip: !token || !!user,
  });
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
    if (isError) {
      dispatch(logout());
    }
  }, [data, dispatch, user, isSuccess, isError]);

  return {
    user,
    isLoading: isLoading,
    isError,
    isSuccess,
  };
}
