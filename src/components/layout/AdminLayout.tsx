import { Outlet } from "react-router-dom";

export const AdminLayout = () => {
  return (
    <div className="grid">
      <h1>Left side bar</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
