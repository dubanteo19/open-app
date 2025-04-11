import { Outlet } from "react-router-dom";
import { LeftSideBar } from "../admin/LeftSideBar";
import { RightSideBar } from "../admin/RightSideBar";

export const UserLayout = () => {
  return (
    <div className="grid grid-cols-12 h-screen px-16">
      <LeftSideBar className="col-span-2 bg-green-500" />
      <div className="col-span-7">
        <Outlet />
      </div>
      <RightSideBar className="col-span-3 bg-orange-500" />
    </div>
  );
};
