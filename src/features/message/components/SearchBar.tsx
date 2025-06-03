import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FC } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineGroupAdd } from "react-icons/md";
import { Link } from "react-router-dom";

interface SearchBarProps {
  onClickAddConversation: () => void;
}
export const SearchBar: FC<SearchBarProps> = ({ onClickAddConversation }) => {
  return (
    <div className="flex items-center gap-2 w-full px-2 py-2">
      <Link to={`/`}>
        <FaArrowLeft />
      </Link>
      <Input
        placeholder="Search Open"
        className="rounded-full hover:bg-gray-200 border-zinc-50"
      />
      <Button variant={"ghost"} onClick={onClickAddConversation}>
        <MdOutlineGroupAdd size={35} color="gray" />
      </Button>
    </div>
  );
};
