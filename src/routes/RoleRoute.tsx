import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  allowedRoles: string[];
  children: ReactNode;
}
export const RoleRoute: React.FC<Props> = ({ allowedRoles, children }) => {
  const user = true;
  const location = useLocation();
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  if (!allowedRoles.includes("ADMIN"))
    return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};
