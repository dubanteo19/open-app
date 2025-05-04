import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChatBubble, ChatBubbleAvatar, ChatBubbleMessage } from "@/components/ui/chat/chat-bubble";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Input } from "@/components/ui/input";
import { RootState } from "@/shared/store";
import { ImageIcon, Paperclip, Plus, Smile, ThumbsUp } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { ConversationDetail, Message } from "../dto/ConversationInfo";

const ChatInput = () => {
  return (
    <div className="flex items-center space-x-2 border-t p-2">
      {/* Left side icons */}
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon">
          <Plus className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <ImageIcon className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Paperclip className="h-5 w-5" />
        </Button>
      </div>

      {/* Input message */}
      <div className="flex flex-1 items-center rounded-full border px-4 py-2">
        <Input
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Type a message..."
        />
        <Button variant="ghost" size="icon">
          <Smile className="h-5 w-5" />
        </Button>
      </div>

      {/* Right side like icon */}
      <Button variant="ghost" size="icon">
        <ThumbsUp className="h-5 w-5" />
      </Button>
    </div>
  );
}


interface ChatHeaderProps {
  title: string;
  subtitle?: string;
  avatar: string;
  isOnline: boolean;
  isGroup?: boolean;
  memberNumbers?: number;
}
const ChatHeader: React.FC<ChatHeaderProps> = () => {
  const conversation = useSelector((state: RootState) => state.chat.chatContent?.conversation);
  const { name: title, avatar, isOnline, isGroup, memberName } = conversation;
  const memberNumbers = 0;
  return (
    <div className="flex items-center justify-between bg-primary-foreground p-4 sticky top-0 z-10">
      <div className="flex items-center space-x-2">
        <Avatar className="h-14 w-14 border-2 border-primary">
          <AvatarImage src={avatar} alt="AI" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{title ? title : 'User name'}</p>
          <p className="text-xs text-muted-foreground">{isOnline ? 'Online' : 'Offline'} {isGroup ? isGroup : <span>- {memberNumbers ? memberNumbers : 12} members</span>}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">

      </div>
    </div>
  );
}

interface ChatContenCompoentProps {
  messageList: Message[];
}

const ChatContenCompoent: React.FC<ChatContenCompoentProps> = () => {
  const messageList = useSelector((state: RootState) => state.chat.chatContent?.messageList);
  const { user } = useSelector((state: RootState) => state.auth);
  const getMessageVariant = (isMine: boolean) =>
    isMine ? "sent" : "received";
  return (
    <div className="flex h-full w-full flex-col space-y-4 overflow-hidden bg-gray-200">
      CHAT CONTENT
      <ChatMessageList>
        {messageList.map((message) => {
          const isMine = message.sender.id === user?.id;
          const variant = getMessageVariant(isMine);
          return (
            <ChatBubble key={message.id} variant={variant}>
              <ChatBubbleAvatar fallback={variant === 'sent' ? 'sent' : 'received'} src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/vibrent_1.png" className="w-13 h-13" />
              <ChatBubbleMessage>
                {message.content}
                <p></p>
              </ChatBubbleMessage>
            </ChatBubble>
          );
        })}
      </ChatMessageList>

    </div>
  );
}

export const ChatContent = (
  // { conversation, memberList, messageList }
) => {
  const conversation = useSelector((state: RootState) => state.chat.chatContent?.conversation);
  return (
    <div className="flex flex-col h-full w-full bg-background">
      {conversation && (
        <>
          <ChatHeader />
          <ChatContenCompoent />
          <ChatInput />
        </>
      )}
      Chưa chọn cuộc hội thoại nào
    </div>
  );
}