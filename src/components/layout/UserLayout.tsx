import { RightSideBar } from "@/components/user/rightSideBar/RightSideBar";
import {
  notificationApi,
  useGetUnreadNotificationCountQuery,
} from "@/features/user/notifications/api";
import { useStomp } from "@/hooks/useStomp";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { toast } from "sonner";
import { LeftSideBar } from "../user/LeftSideBar";
import { incrementUnreadNotification } from "@/features/user/meta/slice";
import { useGetUnseenConversationCountQuery } from "@/features/message/api";

export const UserLayout = () => {
  const { connected, subscribeToTopic } = useStomp();
  useGetUnreadNotificationCountQuery();
  useGetUnseenConversationCountQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!connected) return;
    const topic = "/user/queue/notifications";
    const unsubscribe = subscribeToTopic(topic, (message) => {
      toast.success(message.body, { duration: 2000 });
      dispatch(incrementUnreadNotification());
      dispatch(notificationApi.util.invalidateTags(["Notification"]));
    });
    return () => {
      unsubscribe();
    };
  }, [connected, subscribeToTopic, dispatch]);
  return (
    <div className="flex justify-center  min-h-screen px-15  lg:px-35 w-full ">
      <div className=" lg:block fixed top-0  left-[10px] lg:left-[200px] lg:w-56   ">
        <LeftSideBar />
      </div>
      <div className="w-full lg:ml-[290px] ">
        <div className="lg:mr-[350px] border-x-gray-500/20 border-l-2 min-h-screen">
          <Outlet />
        </div>
        <div className="hidden lg:block fixed top-0 right-40 h-screen w-[300px] ">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};
