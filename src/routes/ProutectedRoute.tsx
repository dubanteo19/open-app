import { Loader } from "@/components/common/Loader";
import { useLoadUserFromToken } from "@/hooks/useLoadUser";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface Props {
  children: ReactNode;
}
export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isLoading, isSuccess, user } = useLoadUserFromToken();
  if (isLoading) {
    return <Loader />;
  } else if (!user && !isSuccess) {
    return <Navigate to="/login" state={"Please login first"} />;
  } else if (user) {
    return children;
  }
};
