import { FollowButton } from "@/components/common/FollowButton";
import { useGetOpenersQuery } from "@/features/discovery/api";
import { uuid } from "@/lib/utils";
import { AVATAR } from "@/shared/constant";
import { SuggestedOpener } from "@/types/user";
import { Loader } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export const UserCard: React.FC<SuggestedOpener> = ({
  id,
  displayName,
  avatarUrl,
  username,
  followed,
  me,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex space-x-2">
        <div className="size-10 overflow-hidden rounded-full flex-shrink-0">
          <img className="w-full h-full" src={avatarUrl || AVATAR} />
        </div>
        <div>
          <strong>{displayName}</strong>
          <Link to={`/profile/${username}`}>
            <p className="text-gray-500 text-sm">@{username}</p>
          </Link>
        </div>
      </div>
      <div className="flex space-x-2">
        {!me && <FollowButton followed={followed} targetOpenerId={id} />}
      </div>
    </div>
  );
};
export const RecommendedFollows = () => {
  const { data: recommendedFollowUsers, isLoading } = useGetOpenersQuery({
    size: 4,
    page: 0,
  });
  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-y-2 px-2 overflow-hidden max-h-[320px]">
      {isLoading && <Loader />}
      <h3 className="my-1">Who to follow</h3>
      <div className="flex flex-col space-y-4 mt-2">
        {recommendedFollowUsers &&
          recommendedFollowUsers.content.map((user) => (
            <UserCard key={uuid()} {...user} />
          ))}
      </div>
      <div className="mt-4">
        <Link className="text-primary " to={"/more"}>
          Show more
        </Link>
      </div>
    </div>
  );
};
