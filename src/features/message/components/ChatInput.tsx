import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, LucideSend } from "lucide-react";
import React, { FC, useState } from "react";
import { FaPaperclip, FaPlus, FaRegSmile } from "react-icons/fa";
import { MdThumbUp } from "react-icons/md";
import EmojiPicker from "emoji-picker-react";

interface ChatInputProps {
  onSend: (content: string) => void;
}

export const ChatInput: FC<ChatInputProps> = ({ onSend }) => {
  const [message, setMessage] = React.useState("");
  const [showSendIcon, setShowSendIcon] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiRef = React.useRef<HTMLDivElement>(null);
  const handleSendMessage = () => {};

  return (
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
          onChange={(e) => {
            onSend(e.target.value);
          }}
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
            <FaRegSmile className="size-5" />
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
        {showSendIcon ? (
          <LucideSend className="size-5" />
        ) : (
          <MdThumbUp className="size-5" />
        )}
      </Button>
    </div>
  );
};
