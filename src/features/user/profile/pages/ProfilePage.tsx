import { Loader } from "@/components/common/Loader";
import { Avatar } from "@/features/user/profile/component/Avatar.tsx";
import { TabsWithIcon } from "@/features/user/profile/component/TabsWithIcon.tsx";
import { UserInfo } from "@/features/user/profile/component/UserInfo.tsx";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { skipToken } from "@reduxjs/toolkit/query";
import { Navigate, useParams } from "react-router-dom";
import { useGetProfileQuery } from "../api";

export const ProfilePage = () => {
  const { username } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const { data: info, isLoading } = useGetProfileQuery(username ?? skipToken);
  if (isLoading) return <Loader />;
  if (!info) return <Navigate to={"/404"} />;
  return (
    <div>
      <div className="pb-4">
        <Avatar
          isMine={username == user?.username}
          displayName={info.summary.displayName}
          location={info.location}
          bio={info.bio}
          openerId={info.summary.id}
          avatarUrl={info.summary.avatarUrl}
        />
        <UserInfo {...info} />
        <TabsWithIcon />
      </div>
    </div>
  );
};
