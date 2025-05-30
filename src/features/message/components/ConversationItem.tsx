import { cn } from "@/lib/utils";
import { AVATAR } from "@/shared/constant";
import { useNavigate } from "react-router-dom";
import { ConversationSummary } from "../type/conversation";

interface ConversationItemProps {
  conversation: ConversationSummary;
  typing: boolean;
  selected: boolean;
}
export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  selected,
  typing,
}) => {
  const naviate = useNavigate();
  return (
    <div
      onClick={() => naviate(`conversations/${conversation.id}`)}
      className={cn(
        "flex flex-row w-full h-[65px] items-center px-1 hover:bg-gray-200 cursor-pointer",
        selected && "bg-gray-200",
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "w-13 h-13 rounded-full overflow-hidden my-2 mr-1 flex-shrink-0",
          typing && "animate-spin",
        )}
      >
        <img className="w-full h-full" src={conversation.avatar || AVATAR} />
      </div>
      <div className="flex flex-col w-full justify-space-between overflow-hidden">
        <div
          className={cn(
            "flex justify-between items-center text-[18px] font-semibold gap-1 text-sm truncate",
            conversation.unread ? "font-bold" : "font-normal",
          )}
        >
          <p className="truncate">{conversation.name}</p>
          <span
            className={cn(
              "font-normal whitespace-nowrap",
              conversation.unread ? "text-black" : "text-gray-500",
            )}
          >
            {/*             {formatTime(conversation.lastMessage.createdAt)} */}
          </span>
        </div>
        <div
          className={cn(
            "flex text-sm mr-1 gap-1 overflow-hidden whitespace-nowrap",
            conversation.unread ? "text-black" : "text-gray-500",
          )}
        >
          <p className="truncate flex-grow">
            {/*             {conversation.lastMessage.content} */}
          </p>
          {conversation.unread && (
            <div className="w-2 h-2 rounded-full flex-shrink-0 bg-red-500"></div>
          )}
        </div>
      </div>
    </div>
  );
};
