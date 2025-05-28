import { useAppSelector } from "@/hooks/useAppDispatch";
import { AVATAR } from "@/shared/constant";
import { FC } from "react";
import { ChatHeader } from "../components/ChatHeader";
import { ChatInput } from "../components/ChatInput";
import { MessageBubble } from "../components/MessageBubble";
import { Message } from "../type/message";
import { MessageCircleIcon } from "lucide-react";

interface ChatMessageListProps {
  messages: Message[];
}
const ChatMessageList: FC<ChatMessageListProps> = ({ messages }) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <div className="flex h-full w-full flex-col space-y-4 overflow-hidden bg-gray-200">
      {messages.length > 0 ? (
        <div className="flex flex-col gap-2 p-4 overflow-y-auto h-full">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isMine={user?.id === msg.sender.id}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-gray-500 gap-2">
          <MessageCircleIcon />
          <p>Chưa có tin nhắn nào</p>
          <span className="text-sm text-gray-400">
            Hãy gửi tin nhắn để bắt đầu cuộc trò chuyện
          </span>
        </div>
      )}
    </div>
  );
};

export const ChatWindow = () => {
  const handleSendMessage = (content: string) => {
    console.log(content);
  };
  return (
    <div className="flex flex-col h-full w-full bg-background">
      <ChatHeader title={"abc"} avatar={AVATAR} isOnline />
      <ChatMessageList messages={[]} />
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};
