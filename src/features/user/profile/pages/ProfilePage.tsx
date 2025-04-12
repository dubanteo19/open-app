
import {UserInfo} from "@/features/user/profile/component/UserInfo.tsx";
import {Avatar} from "@/features/user/profile/component/Avatar.tsx";
import {TabsWithIcon} from "@/features/user/profile/component/TabsWithIcon.tsx";


export const ProfilePage = () => {
  return (
      <div className="w-full mx-auto overflow-hidden shadow-lg font-sans">
          <Avatar/>
          <UserInfo/>
          <TabsWithIcon/>
      </div>
  );
};
