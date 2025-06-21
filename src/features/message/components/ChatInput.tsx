import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStomp } from "@/hooks/useStomp";
import EmojiPicker from "emoji-picker-react";
import { debounce } from "lodash";
import { ImageIcon, LucideSend } from "lucide-react";
import React, { FC, FormEvent, useMemo, useState } from "react";
import { FaPaperclip, FaPlus, FaRegSmile } from "react-icons/fa";
import { MdThumbUp } from "react-icons/md";

interface ChatInputProps {
  onSend: (content: string) => void;
  conversationId: number | null;
  to: string;
}

export const ChatInput: FC<ChatInputProps> = ({
  onSend,
  conversationId,
  to,
}) => {
  const [message, setMessage] = React.useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiRef = React.useRef<HTMLDivElement>(null);
  const { connected, stompClient } = useStomp();
  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const filteredMessage = message.trim() === "" ? "👍" : message;
    onSend(filteredMessage);
    setMessage("");
  };
  const debouncedSendTypingEvent = useMemo(
    () =>
      debounce(() => {
        const body = {
          from: null,
          conversationId,
          to,
          type: "TYPING",
        };
        if (connected && stompClient.current) {
          stompClient?.current.publish({
            destination: "/app/chat.typing",
            body: JSON.stringify(body),
          });
        } else {
          console.log("Not connected, cannot send typing event");
        }
      }, 300),
    [conversationId, to, connected, stompClient],
  );
  const handleTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
    debouncedSendTypingEvent();
  };
  return (
    <form onSubmit={handleSendMessage}>
      <div className="flex items-center space-x-2 border-t p-2">
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <FaPlus className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <ImageIcon className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <FaPaperclip className="size-5" />
          </Button>
        </div>
        <div className="flex flex-1 items-center rounded-full border px-4 py-2">
          <Input
            className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="Type a message..."
            onChange={handleTyping}
            value={message}
            size={200}
          />
          {/* Emoji button */}
          <div className="relative" ref={emojiRef}>
            <Button
              variant="ghost"
              type="button"
              size="icon"
              onClick={() => setShowEmojiPicker((prev) => !prev)}
            >
              <FaRegSmile className="size-5" />
            </Button>
            {/* Emoji Picker popup */}
            {showEmojiPicker && (
              <div className="absolute bottom-10 right-0 z-50">
                <EmojiPicker
                  onEmojiClick={(emoji) => {
                    setMessage((prev) => prev + emoji.emoji);
                  }}
                  previewConfig={{ showPreview: false }}
                />
              </div>
            )}
          </div>
        </div>
        {/* Right side like icon */}
        <Button variant="ghost" size="icon" type="submit">
          {message.trim() ? (
            <LucideSend className="size-5" />
          ) : (
            <MdThumbUp className="size-5" />
          )}
        </Button>
      </div>
    </form>
  );
};
