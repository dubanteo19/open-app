import { Loader } from "@/components/common/Loader";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetConversationsQuery,
  useGetOrCreateConversationMutation,
} from "../api";
import { ConversationItem } from "../components/ConversationItem";
import { FriendList } from "./FriendList";
import { SearchBar } from "./SearchBar";

export const ConversationList = () => {
  const { selectedConversationId, chatSignal } = useAppSelector(
    (state) => state.chat,
  );
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { isLoading } = useGetConversationsQuery();
  const { conversations } = useAppSelector((state) => state.chat);
  const [createConversation] = useGetOrCreateConversationMutation();
  const navigate = useNavigate();
  const handleClickAddConversation = () => {
    setShowDialog(true);
  };
  const handleClickFriend = async (targetId: number) => {
    try {
      const res = await createConversation({ targetId }).unwrap();
      setShowDialog(false);
      navigate(`conversations/${res.id}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-full flex flex-col bg-primary-foreground py-1">
      {isLoading && <Loader />}
      <div className="shadow-sm sticky top-0 z-10">
        <SearchBar onClickAddConversation={handleClickAddConversation} />
      </div>
      <div className="flex-1 overflow-y-scroll overflow-x-clip">
        {conversations &&
          conversations.map((conversation) => (
            <ConversationItem
              selected={selectedConversationId == conversation.id}
              typing={chatSignal?.from ==conversation.name}
              key={conversation.id}
              conversation={conversation}
            />
          ))}
      </div>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">New conversation</DialogTitle>
            <DialogDescription>
              Select your friend to start a new conversation
            </DialogDescription>
          </DialogHeader>
          <FriendList onClickFriend={handleClickFriend} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
