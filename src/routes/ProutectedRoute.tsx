import { useLoadUserFromToken } from "@/hooks/useLoadUser";
import { Loader } from "lucide-react";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface Props {
  children: ReactNode;
}
export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, isLoading, isError } = useLoadUserFromToken();

  if (isLoading) {
    return <Loader />;
  }

  if (!user || isError) {
    return <Navigate to="/login" state="Please login first" />;
  }

  return <>{children}</>;
};
