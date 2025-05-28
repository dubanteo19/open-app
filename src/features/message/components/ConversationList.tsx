import { Loader } from "@/components/common/Loader";
import { useGetConversationsQuery } from "../api";
import { ConversationItem } from "../components/ConversationItem";
import { SearchBar } from "./SearchBar";

export const ConversationList = () => {
  const { data: conversations, isLoading } = useGetConversationsQuery();
  return (
    <div className="h-screen w-full flex flex-col bg-primary-foreground py-1">
      {isLoading && <Loader />}
      <div className="shadow-sm sticky top-0 z-10">
        <SearchBar />
      </div>
      <div className="flex-1 overflow-y-scroll overflow-x-clip">
        {conversations &&
          conversations.map((conversation) => (
            <ConversationItem
              key={conversation.id}
              conversation={conversation}
            />
          ))}
      </div>
    </div>
  );
};
