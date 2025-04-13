import { UserInfo } from "@/features/user/profile/component/UserInfo.tsx";
import { Avatar } from "@/features/user/profile/component/Avatar.tsx";
import { TabsWithIcon } from "@/features/user/profile/component/TabsWithIcon.tsx";
import { userInfo } from "@/features/user/profile/data";

export const ProfilePage = () => {
  const info = userInfo;
  return (
    <div>
      {/* Truyền hàm updateUserInfo vào Avatar */}
      <Avatar {...info} />
      <UserInfo {...info} />
      <TabsWithIcon />
    </div>
  );
};
