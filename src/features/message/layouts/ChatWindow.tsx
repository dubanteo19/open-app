import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { RootState } from "@/shared/store";
import EmojiPicker from 'emoji-picker-react';
import React, { FC, useEffect } from "react";
import { CiImageOn } from "react-icons/ci";
import { FaPaperclip, FaPlus, FaRegSmile } from "react-icons/fa";
import { LuSendHorizontal } from "react-icons/lu";
import { MdThumbUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { ConversationDetail, Message } from "../dto/ConversationInfo";
import { useAutoScroll } from "./useAutoScroll";
import { updateConversationWithNewMessage } from "../dto/slice";

interface ChatInputProps {
  onSend: (msg: Message) => void;
  conversationId: number;
}

const ChatInput: FC<ChatInputProps> = ({ onSend, conversationId }) => {
  const [message, setMessage] = React.useState("");
  const [showSendIcon, setShowSendIcon] = React.useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const emojiRef = React.useRef<HTMLDivElement>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleSendMessage = () => {
    const trimmed = message.trim();
    if (!user) return;

    const newMessage: Message = {
      id: Date.now() + 1,
      content: trimmed.length === 0 ? "👍" : trimmed,
      sender: user,
      time: new Date().toLocaleTimeString(),
      conversationId: conversationId,
    };

    onSend(newMessage);
    setMessage("");
    setShowSendIcon(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 👉 Click outside emoji picker để đóng
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiRef.current &&
        !emojiRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="flex items-center space-x-2 border-t p-2">
      {/* Left side icons */}
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon">
          <FaPlus className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <CiImageOn className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <FaPaperclip className="h-5 w-5" />
        </Button>
      </div>
      {/* Input message */}
      <div className="flex flex-1 items-center rounded-full border px-4 py-2">
        <Input
          className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Type a message..."
          onChange={(e) => {
            setMessage(e.target.value);
            setShowSendIcon(e.target.value.length > 0);
          }}
          onKeyDown={handleKeyDown}
          value={message}
          size={200}
        />
        {/* Emoji button */}
        <div className="relative" ref={emojiRef}>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowEmojiPicker((prev) => !prev)}
          >
            <FaRegSmile className="h-5 w-5" />
          </Button>
          {/* Emoji Picker popup */}
          {showEmojiPicker && (
            <div className="absolute bottom-10 right-0 z-50">
              <EmojiPicker
                onEmojiClick={(emoji) => {
                  setMessage((prev) => prev + emoji.emoji);
                  setShowSendIcon(true);
                }}
                previewConfig={{ showPreview: false }}
              />
            </div>
          )}
        </div>
      </div>
      {/* Right side like icon */}
      <Button variant="ghost" size="icon" onClick={handleSendMessage}>
        {showSendIcon ? <LuSendHorizontal className="h-5 w-5" /> : <MdThumbUp className="h-5 w-5" />}
      </Button>
    </div>
  );
}

interface ChatHeaderProps {
  title: string;
  avatar?: string;
  isOnline: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  avatar,
  isOnline,
}) => {
  return (
    <div className="flex items-center justify-between p-2 sticky top-0 z-10 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        {/* Avatar */}
        <div className="relative flex size-8 shrink-0 overflow-hidden rounded-full h-14 w-14 border-2 border-primary">
          <img src={avatar} alt={title} />
        </div>
        {/* User info */}
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{title ? title : 'User name'}</p>
          <div className="flex items-center space-x-1">
            <p className="text-xs text-muted-foreground">{isOnline ? 'Online' : 'Offline'}</p>
            <div className={cn("w-2 h-2 rounded-full  border border-white",
              isOnline ? "bg-green-500" : "bg-gray-400"
            )}></div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
      </div>
    </div>
  );
}
interface ChatMessageBubbleProps {
  message: Message,
  isMine: boolean;
}
const ChatMessageBubble: FC<ChatMessageBubbleProps> = ({ message, isMine }) => {
  const { sender, content, time } = message;
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

      <div className={cn("flex flex-col  ", isMine ? "items-end" : "items-start")}>
        <div
          className={cn(
            "rounded-xl px-4 py-2   text-sm k max-w-[600px] shadow",
            isMine
              ? "bg-primary/90   rounded-br-none"
              : "bg-white rounded-bl-none "
          )}
        >
          {!isMine && (
            <h3 className=" text-primary leading-none my-1">{sender.username}</h3>
          )}
          <div className="wrap-break-word">{content}</div>
          <div className={"flex text-xs justify-end text-gray-600 bottom-1 right-2"}>{time}</div>
        </div>
      </div>
    </div>
  );
};

interface ChatMessageListProps {
  messages: Message[];
}
const ChatMessageList: FC<ChatMessageListProps> = (
  { messages }
) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { ref, handleNewContent } = useAutoScroll<HTMLDivElement>();

  useEffect(() => {
    if (messages.length > 0) { handleNewContent(); } // Gọi khi có tin nhắn mới
    console.log("message list", messages);

  }, [messages, handleNewContent]);


  return (
    <div className="flex h-full w-full flex-col space-y-4 overflow-hidden bg-gray-200">
      {messages.length > 0 ? (
        <div className="flex flex-col gap-2 p-4 overflow-y-auto h-full" ref={ref}>
          {messages.map((msg) => (
            <ChatMessageBubble key={msg.id} message={msg} isMine={user?.id === msg.sender.id} />
          ))}
        </div>
      ) :
        <div className="flex flex-1 flex-col items-center justify-center text-gray-500 gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z" />
          </svg>
          <p>Chưa có tin nhắn nào</p>
          <span className="text-sm text-gray-400">Hãy gửi tin nhắn để bắt đầu cuộc trò chuyện</span>
        </div>
      }
    </div>
  );
}

interface ChatWindowProps {
  conversationDetail?: ConversationDetail | null;
  conversationId?: number | null;
}
export const ChatWindow: FC<ChatWindowProps> = (
  { conversationDetail, conversationId }
) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = React.useState<Message[]>(conversationDetail?.messageList || []);
  const receiver = conversationDetail?.memberList?.[1];
  useEffect(() => {
    if (conversationDetail?.messageList) {
      setMessages(conversationDetail.messageList);
    }
  }, [conversationDetail]);

  const handleSendMessage = (msg: Message) => {
    if (msg.content.length === 0) {
      msg.content = "👍";
    }
    dispatch(updateConversationWithNewMessage({
      conversationId: conversationId ? conversationId : -1,
      message: msg
    }));
    setMessages(prev => [...prev, msg]);

    // phản hồi
    if (!receiver) return;
    setTimeout(() => {
      setMessages(prev => {
        const lastId = prev.length > 0 ? prev[prev.length - 1].id : 0;
        const response: Message = {
          ...msg,
          id: lastId + 1,
          sender: receiver,
          content: "I got the message: " + msg.content,
          time: new Date().toLocaleTimeString(),
        };
        dispatch(updateConversationWithNewMessage({
          conversationId: conversationId ?? -1,
          message: response,
        }));
        return [...prev, response];
      });
    }, 1500);
  };

  return (
    <div
      className="flex flex-col h-full w-full bg-background">
      {conversationDetail ? (
        <>
          <ChatHeader title={conversationDetail.conversation.name} avatar={conversationDetail.conversation.avatar} isOnline />
          <ChatMessageList messages={messages} />
          <ChatInput onSend={handleSendMessage} conversationId={conversationDetail.conversation.id} />
        </>
      )
        : (
          <div className="flex h-full w-full items-center justify-center bg-pri">
            <p className="text-gray-500">Select a conversation to start chatting</p>
          </div>
        )
      }
    </div>
  );
}