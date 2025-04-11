import { Outlet } from "react-router-dom";
import { LeftSideBar } from "../user/LeftSideBar";
import { RightSideBar } from "@/components/user/rightSideBar/RightSideBar";

export const UserLayout = () => {
  return (
    <div className="grid grid-cols-12 h-screen px-46">
      <LeftSideBar className="col-span-2 " />
      <div className="col-span-7">
        <Outlet />
      </div>
      <RightSideBar className="col-span-3 " />
    </div>
  );
};
