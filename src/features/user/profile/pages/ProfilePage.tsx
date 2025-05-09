import { UserInfo } from "@/features/user/profile/component/UserInfo.tsx";
import { Avatar } from "@/features/user/profile/component/Avatar.tsx";
import { TabsWithIcon } from "@/features/user/profile/component/TabsWithIcon.tsx";
import { Navigate, useParams } from "react-router-dom";
import { useGetProfileQuery } from "../api";
import { Loader } from "@/components/common/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";
import { skipToken } from "@reduxjs/toolkit/query";

export const ProfilePage = () => {
  const { username } = useParams();
  const { user } = useSelector((state: RootState) => state.auth);
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
