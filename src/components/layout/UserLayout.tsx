import { Outlet } from "react-router-dom";
import { LeftSideBar } from "../user/LeftSideBar";
import { RightSideBar } from "@/components/user/rightSideBar/RightSideBar";

export const UserLayout = () => {
  return (
    <div className="flex justify-center  min-h-screen px-5 lg:px-50 w-full">
      <div className="hidden lg:block fixed top-0 left-[200px] w-64  ">
        <LeftSideBar />
      </div>
      <div className="w-full lg:ml-[250px] ">
        <div className=" lg:mr-[350px]">
          <Outlet />
        </div>
        <div className="hidden lg:block fixed top-0 right-50 h-screen w-[350px]">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};
