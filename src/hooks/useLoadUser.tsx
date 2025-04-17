import { useAuthMeQuery } from "@/features/auth/api";
import { setUser } from "@/features/auth/slice";
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
    if (isSuccess && data && !user) {
      dispatch(setUser(data));
    }
  }, [data, isSuccess, dispatch, user]);

  return {
    user,
    isLoading: isLoading || (!!token && !user),
    isError,
  };
}
