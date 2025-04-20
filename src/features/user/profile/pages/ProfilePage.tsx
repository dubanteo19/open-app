import { UserInfo } from "@/features/user/profile/component/UserInfo.tsx";
import { Avatar } from "@/features/user/profile/component/Avatar.tsx";
import { TabsWithIcon } from "@/features/user/profile/component/TabsWithIcon.tsx";
import { useParams } from "react-router-dom";
import { useGetProfileQuery } from "../api";
import { Loader } from "@/components/common/Loader";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";
import { EditPostDialog } from "@/shared/components/EditPostDialog";

export const ProfilePage = () => {
  const { username } = useParams();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: info, isLoading } = useGetProfileQuery(username || "");
  return (
    <div>
      {isLoading && <Loader />}

      <EditPostDialog />
      {info && (
        <div>
          <Avatar
            isMine={username == user?.username}
            {...info.summary}
            openerId={info.summary.id}
            bio={info.bio}
            location={info.location}
          />
          <UserInfo {...info} />
          <TabsWithIcon />
        </div>
      )}
    </div>
  );
};
