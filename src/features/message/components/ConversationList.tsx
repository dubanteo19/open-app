import { FC } from "react";
import { ConversationItem } from "../components/ConversationItem";
import { Conversation } from "../type/conversation";
import { SearchBar } from "./SearchBar";

interface ConversationListProps {
  conversations: Conversation[];
}
export const ConversationList: FC<ConversationListProps> = ({
  conversations,
}) => {
  return (
    <div className="h-screen w-full flex flex-col bg-primary-foreground py-1">
      <div className="shadow-sm sticky top-0 z-10">
        <SearchBar />
      </div>
      <div className="flex-1 overflow-y-scroll overflow-x-clip">
        {conversations.map((conversation) => (
          <ConversationItem key={conversation.id} conversation={conversation} />
        ))}
      </div>
    </div>
  );
};
