import { cn } from "@/lib/utils";
import { RootState } from "@/shared/store";
import { useSelector } from "react-redux";
import { Conversation } from "../dto/ConversationInfo";
import { formatTime } from "../dto/untils";

interface ConversationItemProps {
    conversation: Conversation;
    onClick: () => void;
}
export const ConversationItem: React.FC<ConversationItemProps> = ({
    conversation,
    onClick,
}) => {
    const conversationId = useSelector((state: RootState) => state.chat.conversationId);
    const isSelected = conversationId === conversation.id;

    return (
        <div className={cn("flex flex-row w-full h-[65px] items-center px-1 hover:bg-gray-200 cursor-pointer",
            isSelected ? "bg-gray-200" : "",
        )}
            onClick={onClick}>
            {/* Avatar */}
            <div className="w-13 h-13 rounded-full overflow-hidden my-2 mr-1 flex-shrink-0">
                <img className="w-full h-full" src={conversation.avatar} />
            </div>
            <div className="flex flex-col w-full justify-space-between overflow-hidden">
                <div className={cn("flex justify-between items-center text-[18px] font-semibold gap-1 text-sm truncate",
                    conversation.unread ? "font-bold" : "font-normal"
                )}>
                    <p className="truncate">
                        {conversation.name}
                    </p>
                    <span className={cn("font-normal whitespace-nowrap", conversation.unread ? "text-black" : "text-gray-500")}>
                        {formatTime(conversation.lastMessage.time)}
                    </span>
                </div>
                <div className={cn("flex text-sm mr-1 gap-1 overflow-hidden whitespace-nowrap",
                    conversation.unread ? "text-black" : "text-gray-500"
                )}>
                    {conversation.isGroup && (
                        <>
                            <p className="font-medium max-w-[50%] truncate flex-shrink-0">
                                {conversation.memberName}
                            </p>
                            <span className="">:</span>
                        </>

                    )}
                    <p className="truncate flex-grow">
                        {conversation.lastMessage.content}
                    </p>
                    {conversation.unread && (
                        <div className="w-2 h-2 rounded-full flex-shrink-0 bg-red-500"></div>
                    )}
                </div>

            </div>
        </div>
    );
}