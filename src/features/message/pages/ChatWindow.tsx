import { Loader } from "@/components/common/Loader";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { useStomp } from "@/hooks/useStomp";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetConversationByIdQuery, useMarkAsSeenMutation } from "../api";
import { CallManager } from "../components/CallManager";
import { ChatHeader } from "../components/ChatHeader";
import { ChatInput } from "../components/ChatInput";
import { ChatMessageList } from "../components/ChatMessageList";
import { NoConversationScreen } from "../components/NoConversationScreen";
import { addMessageToConversation, setChatSignal } from "../slice";

export const ChatWindow = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const dispatch = useDispatch();
  const conversationIdNumber = conversationId ? Number(conversationId) : null;
  const { connected, subscribeToTopic, stompClient } = useStomp();

  const { data: conversation, isLoading } = useGetConversationByIdQuery(
    conversationIdNumber ?? skipToken,
    { refetchOnMountOrArgChange: true },
  );
  const { messagesByConversation, selectedConversationId } = useAppSelector(
    (state) => state.chat,
  );
  const handleSendMessage = async (content: string) => {
    const body = {
      content,
      conversationId: selectedConversationId,
      receiver: conversation?.summary.receiver,
    };
    if (stompClient?.current?.connected) {
      stompClient.current.publish({
        destination: "/app/chat.send",
        body: JSON.stringify(body),
      });
    } else {
      console.log("Not connected, cannot send typing event");
    }
  };
  useEffect(() => {
    if (!connected) return;
    const topic = "/user/queue/messages";
    const unsubscribe = subscribeToTopic(topic, (message) => {
      const payload = JSON.parse(message.body);
      dispatch(addMessageToConversation(payload));
      dispatch(setChatSignal(null));
    });
    return () => {
      unsubscribe();
    };
  }, [connected, dispatch, subscribeToTopic]);
  if (isLoading) return <Loader />;
  if (!conversationId) return <NoConversationScreen />;

  return (
    <div className="flex flex-col size-full bg-background">
      {conversation && (
        <ChatHeader
          targetUsername={conversation?.summary.name}
          avatar={conversation?.summary.avatar}
          isOnline
        />
      )}
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
      <CallManager />
    </div>
  );
};
