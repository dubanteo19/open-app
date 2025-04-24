import {
    activateSocketClient,
    deactivateSocketClient,
    getSocketClient,
    subscribeWhenConnected,
} from "@/shared/websocket";
import { useEffect, useState } from "react";

interface TypingIndicatorProps {
  postId?: number;
  currentUsername?: string;
}
export const TypingIndicator: React.FC<TypingIndicatorProps> = ({
  postId,
  currentUsername,
}) => {
  const [isTyping, setIsTyping] = useState<boolean | null>(false);
  useEffect(() => {
    const socketClient = getSocketClient();
    if (!socketClient) {
      return;
    }
    const topic = `/topic/typing/${postId}`;
    const unsubscribe = subscribeWhenConnected(
      socketClient,
      topic,
      (message) => {
        const payload = JSON.parse(message.body);
        console.log(payload.username);
        const typingUsername = payload.username;
        if (typingUsername != currentUsername) {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 3000);
        }
      },
    );
    activateSocketClient();
    return () => {
      unsubscribe();
      deactivateSocketClient();
    };
  }, [postId, currentUsername]);

  if (isTyping)
    return (
      <div className="flex items-center gap-1 text-gray-500 text-sm">
        <span>Someone is typing</span>
        <div className="flex space-x-1">
          <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
        </div>
      </div>
    );
};
