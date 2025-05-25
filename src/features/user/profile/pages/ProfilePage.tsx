import { Loader } from "@/components/common/Loader";
import { Avatar } from "@/features/user/profile/component/Avatar.tsx";
import { UserInfo } from "@/features/user/profile/component/UserInfo.tsx";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { usePaginatedPosts } from "@/hooks/usePaginatedPost";
import { skipToken } from "@reduxjs/toolkit/query";
import { LoaderIcon } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";
import { useGetPostsByAuthorQuery } from "../../feed/api";
import { PostList } from "../../feed/components/PostList";
import { useGetProfileQuery } from "../api";

export const ProfilePage = () => {
  const { username } = useParams<{ username: string }>();
  const { user } = useAppSelector((state) => state.auth);
  const { data: info, isLoading } = useGetProfileQuery(username ?? skipToken);
  const { posts, observerRef, isFetching, handleLikeToggle, handleDeletePost } =
    usePaginatedPosts<{ username: string }>(useGetPostsByAuthorQuery, {
      username: username!,
    });
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
        <div className="flex flex-col">
          <PostList
            posts={posts}
            handleDelete={handleDeletePost}
            handleLikeToggle={handleLikeToggle}
          />
          <div ref={observerRef} className="flex-center h-10 my-4">
            {isFetching && <LoaderIcon className="animate-spin" />}
          </div>
        </div>
      </div>
    </div>
  );
};
