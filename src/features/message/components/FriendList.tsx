import { useGetOpenerFriendsQuery } from "@/features/discovery/api";
import { AVATAR } from "@/shared/constant";
import { User } from "@/types/user";
import { FC } from "react";
interface FriendItemProps extends User {
  onClick: () => void;
}
export const FriendItem: FC<FriendItemProps> = (props) => {
  const friend = props;
  return (
    <div
      className="flex items-center rounded-xl px-2 space-x-2 hover:bg-gray-100 cursor-pointer"
      onClick={props.onClick}
    >
      <div className="size-12 rounded-full overflow-hidden">
        <img className="w-full h-full" src={friend.avatarUrl || AVATAR} />
      </div>
      <p>@{friend.username}</p>
    </div>
  );
};
interface FriendListProps {
  onClickFriend: (friendId: number) => void;
}
export const FriendList: FC<FriendListProps> = ({ onClickFriend }) => {
  const { data: friends } = useGetOpenerFriendsQuery({ page: 0, size: 100 });
  return (
    <div className="flex flex-col space-y-2">
      {friends?.content && friends?.content.length > 0 ? (
        friends.content.map((friend) => (
          <FriendItem
            key={friend.id}
            {...friend}
            onClick={() => onClickFriend(friend.id)}
          />
        ))
      ) : (
        <p className="text-center">You have no friends</p>
      )}
    </div>
  );
};
