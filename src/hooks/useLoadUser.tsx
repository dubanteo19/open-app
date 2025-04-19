import { useAuthMeQuery } from "@/features/auth/api";
import { logout, setUser } from "@/features/auth/slice";
import { RootState } from "@/shared/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useLoadUserFromToken() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
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
