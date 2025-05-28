import { cn, formatTime } from "@/lib/utils";
import { FC } from "react";
import { Message } from "../type/message";

interface ChatMessageBubbleProps {
  message: Message;
  isMine: boolean;
}
export const MessageBubble: FC<ChatMessageBubbleProps> = ({
  message,
  isMine,
}) => {
  const { sender, content, createdAt } = message;
  return (
    <div
      className={cn("flex items-end gap-2", {
        "justify-end": isMine,
        "justify-start": !isMine,
      })}
    >
      {!isMine && (
        <img
          src={sender.avatarUrl}
          alt={sender.displayName}
          className="w-12 h-12 rounded-full mr-2"
        />
      )}
      <div
        className={cn("flex flex-col  ", isMine ? "items-end" : "items-start")}
      >
        <div
          className={cn(
            "rounded-xl px-4 py-2   text-sm k max-w-[600px] shadow",
            isMine
              ? "bg-primary/90   rounded-br-none"
              : "bg-white rounded-bl-none ",
          )}
        >
          {!isMine && (
            <h3 className=" text-primary leading-none my-1">
              {sender.username}
            </h3>
          )}
          <div className="wrap-break-word">{content}</div>
          <div
            className={
              "flex text-xs justify-end text-gray-600 bottom-1 right-2"
            }
          >
            {formatTime(createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};
