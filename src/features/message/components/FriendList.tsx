import { useGetOpenerFriendsQuery } from "@/features/discovery/api";
import { useCreateConversationMutation } from "../api";
import { AVATAR } from "@/shared/constant";

export const FriendList = () => {
  const { data: friends } = useGetOpenerFriendsQuery({ page: 0, size: 20 });
  const [createConversation] = useCreateConversationMutation();
  const handleCreateConversation = async (targetId: number) => {
    try {
      await createConversation({ targetId }).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col">
      {friends?.content &&
        friends.content.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center space-x-2 hover:bg-gray-100 px-2"
            onClick={() => handleCreateConversation(friend.id)}
          >
            <div className="size-12 rounded-full overflow-hidden">
              <img src={friend.avatarUrl || AVATAR} />
            </div>
            <p>@{friend.username}</p>
          </div>
        ))}
    </div>
  );
};
