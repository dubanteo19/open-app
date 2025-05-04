import { Input } from "@/components/ui/input";
import { useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import { ConversationItem } from "../components/ConversationItem";
import { Conversation } from "../dto/ConversationInfo";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";

interface ConversationListProps {
  conversations: Conversation[]}

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center gap-2 w-full px-2 py-2">
      <Input placeholder="Search Open" className="rounded-full hover:bg-gray-200 border-zinc-50" />
      <MdOutlineGroupAdd size={35} color="gray" className="hover:bg-gray-200 cursor-pointer p-1 rounded-sm" />
    </div>
  );
};
export const ConversationList = () => {
  const [isSelected, setIsSelected] = useState(false);
  const handleSelect = () => {
    setIsSelected(!isSelected);
  };
  const handleClick = (conversationId: number) => {
    console.log("Selected conversation ID:", conversationId);
    // Dispatch an action to update the selected conversation in the Redux store
  };
  const conversations = useSelector((state: RootState) => state.chat.conversationList);

  return (
    <div className="h-screen w-full flex flex-col bg-primary-foreground py-1">
      <div className="shadow-sm sticky top-0 z-10">
        <SearchBar />
      </div>
      <div className="flex-1 overflow-y-scroll overflow-x-clip">
        {conversations.map((conversation) => (
          <ConversationItem {...conversation}
            key={conversation.id} 
            onClick={handleClick(conversation.id)}
            />

        ))}

      </div >
    </div>
  );
}