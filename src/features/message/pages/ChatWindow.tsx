import { Loader } from "@/components/common/Loader";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import {
  activateSocketClient,
  deactivateSocketClient,
  getSocketClient,
  subscribeWhenConnected,
} from "@/shared/websocket";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetConversationByIdQuery } from "../api";
import { ChatHeader } from "../components/ChatHeader";
import { ChatInput } from "../components/ChatInput";
import { ChatMessageList } from "../components/ChatMessageList";
import { NoConversationScreen } from "../components/NoConversationScreen";
import { addMessageToConversation, setChatSignal } from "../slice";

export const ChatWindow = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const dispatch = useAppDispatch();
  const conversationIdNumber = conversationId ? Number(conversationId) : null;
  const { data: conversation, isLoading } = useGetConversationByIdQuery(
    conversationIdNumber ?? skipToken,
    { refetchOnMountOrArgChange: true },
  );
  const { messagesByConversation, selectedConversationId } = useAppSelector(
    (state) => state.chat,
  );
  const handleSendMessage = async (content: string) => {
    const client = getSocketClient();
    const body = {
      content,
      conversationId: selectedConversationId,
      receiver: conversation?.summary.receiver,
    };
    if (client?.connected) {
      client.publish({
        destination: "/app/chat.send",
        body: JSON.stringify(body),
      });
    } else {
      console.log("Not connected, cannot send typing event");
    }
  };
  useEffect(() => {
    const client = getSocketClient();
    if (!client) return;
    const topic = "/user/queue/messages";
    const unsubscribe = subscribeWhenConnected(client, topic, (message) => {
      const payload = JSON.parse(message.body);
      dispatch(addMessageToConversation(payload));
      dispatch(setChatSignal(null));
    });
    activateSocketClient();
    return () => {
      unsubscribe(), deactivateSocketClient();
    };
  }, [dispatch]);
  if (isLoading) return <Loader />;
  if (!conversationId) return <NoConversationScreen />;
  return (
    <div className="flex flex-col size-full bg-background">
      <ChatHeader
        title={conversation?.summary.name}
        avatar={conversation?.summary.avatar}
        isOnline
      />
      {selectedConversationId && (
        <ChatMessageList
          messages={messagesByConversation[selectedConversationId]}
        />
      )}
      {conversation && (
        <ChatInput
          to={conversation?.summary.receiver}
          conversationId={conversationIdNumber}
          onSend={handleSendMessage}
        />
      )}
    </div>
  );
};
