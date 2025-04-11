import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
interface Props {
  children: ReactNode;
}
export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const user = true;
  return user ? children : <Navigate to="/login" />;
};
