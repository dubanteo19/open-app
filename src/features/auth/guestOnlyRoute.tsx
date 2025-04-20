import { Navigate } from "react-router-dom";
export const GuestOnlyRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    return <Navigate to="/feed" replace />;
  }

  return children;
};
