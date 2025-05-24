import { Outlet } from "react-router-dom";
import { LeftSideBar } from "../user/LeftSideBar";
import { RightSideBar } from "@/components/user/rightSideBar/RightSideBar";

export const UserLayout = () => {
  return (
    <div className="flex justify-center  min-h-screen px-5 lg:px-35 w-full ">
      <div className="hidden lg:block fixed top-0 left-[200px] w-56  ">
        <LeftSideBar />
      </div>
      <div className="w-full lg:ml-[290px] ">
        <div className="lg:mr-[320px] border-l-gray-500/20 border-l-2">
          <Outlet />
        </div>
        <div className="hidden lg:block fixed top-0 right-40 h-screen w-[300px] ">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};
