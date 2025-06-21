import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AllNotifications from "./AllNotifications";
import UnreadNotifications from "./UnreadNotifications";

const TabNotifications = () => {
  return (
    <div>
      <Tabs defaultValue="allNotifications">
        <TabsList className="w-full">
          <TabsTrigger value="allNotifications">All notifications</TabsTrigger>
          <TabsTrigger value="unreadNotifications">
            Unread notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="allNotifications">
          <AllNotifications />
        </TabsContent>
        <TabsContent value="unreadNotifications">
          <UnreadNotifications />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TabNotifications;
