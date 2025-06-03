import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import {
  activateSocketClient,
  deactivateSocketClient,
  getSocketClient,
  subscribeWhenConnected,
} from "@/shared/websocket";
import { FC, useEffect, useRef } from "react";
import { MessageBubble } from "../components/MessageBubble";
import { setChatSignal } from "../slice";
import { ChatSignal } from "../type/chatSignal";
import { Message } from "../type/message";

interface ChatMessageListProps {
  messages?: Message[];
}
export const ChatMessageList: FC<ChatMessageListProps> = ({ messages }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { chatSignal, selectedConversationId } = useAppSelector(
    (state) => state.chat,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    const socketClient = getSocketClient();
    if (!socketClient) {
      return;
    }
    const topic = "/user/queue/typing";
    const unsubscribe = subscribeWhenConnected(
      socketClient,
      topic,
      (message) => {
        const payload = JSON.parse(message.body) as ChatSignal;
        dispatch(setChatSignal(payload));
        setTimeout(() => dispatch(setChatSignal(null)), 3000);
      },
    );
    activateSocketClient();
    return () => {
      unsubscribe();
      deactivateSocketClient();
    };
  }, [dispatch]);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatSignal]);
  return (
    <div className="flex h-full w-full flex-col space-y-4 overflow-hidden bg-gray-200">
      {messages && messages.length > 0 && (
        <div className="flex flex-col gap-2 p-4 overflow-y-auto h-full">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              isMine={user?.id === msg.sender.id}
            />
          ))}
          {chatSignal &&
            chatSignal.conversationId == selectedConversationId && (
              <div className="flex items-center gap-1 text-gray-500 text-sm ">
                <span>{chatSignal.from} is typing</span>
                <div className="flex space-x-1">
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                </div>
              </div>
            )}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};
