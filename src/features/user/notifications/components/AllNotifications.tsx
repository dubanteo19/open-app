import { Loader } from "@/components/common/Loader";
import { formatTime } from "@/lib/utils";
import { Notification } from "@/types/notification";
import { FC } from "react";
import {
  useGetNotificationQuery,
  useMarkAsReadAllMutation,
  useMarkAsReadMutation,
} from "../api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
export const NotificationItem: FC<
  Notification & { markAsRead: (notificationId: number) => void }
> = (notification) => {
  return (
    <div
      key={notification.id}
      onClick={() => {
        if (!notification.isRead) notification.markAsRead(notification.id);
      }}
      className={` flex items-start space-x-4 p-4 rounded-md border transition-all duration-200
                    ${notification.isRead ? "bg-gray-100" : "bg-blue-50 border-blue-200 cursor-pointer"}`}
    >
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              <small className="text-xs text-gray-500">
                {formatTime(notification.createdAt)}
              </small>
            </div>
            <p className="text-sm text-gray-800 mt-2 line-clamp-2">
              {notification.content}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
function AllNotifications() {
  const { data, isLoading } = useGetNotificationQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const [markAsReadAll] = useMarkAsReadAllMutation();
  const handleReadAll = async () => {
    try {
      await markAsReadAll().unwrap();
      toast.success("Marked all notifications as read");
    } catch (error) {
      console.log(error);
    }
  };
  const handleMarkAsRead = async (notificationId: number) => {
    try {
      await markAsRead(notificationId).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) return <Loader />;
  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <Button onClick={handleReadAll}>Read all</Button>
      </div>
      {data?.length == 0 ? (
        <p>There is no notification</p>
      ) : (
        data?.map((notification) => (
          <NotificationItem
            markAsRead={handleMarkAsRead}
            {...notification}
            key={notification.id}
          />
        ))
      )}
    </div>
  );
}

export default AllNotifications;
