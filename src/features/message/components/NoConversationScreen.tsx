import { MessageCircle } from "lucide-react";

export const NoConversationScreen = () => {
  return (
    <div className=" flex-center bg-gray-200  size-full flex-col">
      <MessageCircle />
      <h3 className="text-gray-500 ">Please select your conversation</h3>
    </div>
  );
};
