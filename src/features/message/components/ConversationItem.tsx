import { cn } from "@/lib/utils";
import { Conversation } from "../dto/ConversationInfo"
import { useState } from "react";
import { formatTime } from "../dto/untils";
import { Console } from "console";

export const ConversationItem: React.FC<Conversation> = ({
    name,
    lastMessage,
    avatar,
    unread,
    isGroup,
    memberName,
}) => {
    const isSelected = false;
    return (
        <div className="flex flex-row w-full h-[65px] items-center px-1 hover:bg-gray-200 cursor-pointer">
            {/* Avatar */}
            <div className="w-13 h-13 rounded-full overflow-hidden my-2 mr-1 flex-shrink-0">
                <img className="w-full h-full" src={avatar} />
            </div>
            <div className="flex flex-col w-full justify-space-between overflow-hidden">
                <div className={cn("flex justify-between items-center text-[18px] font-semibold gap-1 text-sm truncate",
                    isSelected ? "bg-primary text-white" : "text-black", unread ? "font-bold" : "font-normal"
                )}>
                    <p className="truncate">
                        {name}
                    </p>
                    <span className={cn("font-normal whitespace-nowrap", unread ? "text-black" : "text-gray-500")}>
                        {/* {time} */}
                        Thoi gian
                    </span>
                </div>
                <div className={cn("flex text-sm mr-1 gap-1 overflow-hidden whitespace-nowrap",
                    isSelected ? "text-white" : "", unread ? "text-black" : "text-gray-500"
                )}>
                    {isGroup && (
                        <>
                            <p className="font-medium max-w-[50%] truncate flex-shrink-0">
                                {memberName}
                            </p>
                            <span className="">:</span>
                        </>

                    )}
                    <p className="truncate flex-grow">
                        {lastMessage.content}
                    </p>
                    {unread && (
                        <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
                    )}
                </div>

            </div>
        </div>
    );
}