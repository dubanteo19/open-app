import { useAuthMeQuery } from "@/features/auth/api";
import { logout, setUser } from "@/features/auth/slice";
import { useGetLikedPostIdsQuery } from "@/features/user/metadata/api";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./useAppDispatch";
import { setLikedPostIds } from "@/features/user/metadata/slice";

export function useLoadUserFromToken() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const token = localStorage.getItem("accessToken");
  const { data, isLoading, isError, isSuccess } = useAuthMeQuery(undefined, {
    skip: !token || !!user,
  });
  const { data: likedPostIds, isSuccess: likedPostIdsSuccess } =
    useGetLikedPostIdsQuery(undefined, { skip: !data });
  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
    }
    if (isError) {
      dispatch(logout());
    }
  }, [data, dispatch, user, isSuccess, isError]);

  useEffect(() => {
    if (likedPostIds && likedPostIdsSuccess) {
      dispatch(setLikedPostIds(likedPostIds));
    }
  }, [likedPostIds, likedPostIdsSuccess, dispatch]);
  return {
    user,
    isLoading: isLoading,
    isError,
    isSuccess,
  };
}
