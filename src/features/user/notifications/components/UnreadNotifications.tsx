import { Loader } from "@/components/common/Loader";
import {
  useGetUnreadNotificationQuery,
  useMarkAsReadAllMutation,
  useMarkAsReadMutation,
} from "../api";
import { NotificationItem } from "./AllNotifications";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

function UnreadNotifications() {
  const { data, isLoading } = useGetUnreadNotificationQuery();
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

export default UnreadNotifications;
