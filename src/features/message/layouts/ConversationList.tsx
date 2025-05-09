import { Input } from "@/components/ui/input";
import { RootState } from "@/shared/store";
import { useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineGroupAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ConversationItem } from "../components/ConversationItem";
import { openChatContent } from "../dto/slice";

const SearchBar: React.FC = () => {
  return (
    <div className="flex items-center gap-2 w-full px-2 py-2">
      <Link to={`/`}>
        <FaArrowLeft/>
      </Link>
      <Input placeholder="Search Open" className="rounded-full hover:bg-gray-200 border-zinc-50" />
      <MdOutlineGroupAdd size={35} color="gray" className="hover:bg-gray-200 cursor-pointer p-1 rounded-sm" />
    </div>
  );
};
export const ConversationList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { conversationId } = useParams<{ conversationId: string }>();

  const numericId = conversationId ? parseInt(conversationId) : null;

  const conversations = useSelector((state: RootState) => state.chat.conversationList);

  useEffect(() => {
    if (numericId !== null) {
      dispatch(openChatContent(numericId));
    }
  }, [dispatch, numericId]);

  const handleSelected = (id: number) => {
    navigate(`/message/${id}`);
    dispatch(openChatContent(id));
  };

  return (
    <div className="h-screen w-full flex flex-col bg-primary-foreground py-1">
      <div className="shadow-sm sticky top-0 z-10">
        <SearchBar />
      </div>
      <div className="flex-1 overflow-y-scroll overflow-x-clip">
        {conversations.map((conversation) => (
          <ConversationItem
          key={conversation.id}
          conversation={conversation}
          onClick={() => handleSelected(conversation.id)}
            />
        ))}
      </div >
    </div>
  );
}