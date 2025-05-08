import { Outlet } from "react-router-dom";

const ChatLayout = () => {
  return (
    <div className="w-screen h-screen flex">
      <Outlet />
    </div>
  );
};

export default ChatLayout;