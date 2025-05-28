import { Input } from "@/components/ui/input";
import { FC } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineGroupAdd } from "react-icons/md";
import { Link } from "react-router-dom";

interface SearchBarProps {}
export const SearchBar: FC<SearchBarProps> = () => {
  return (
    <div className="flex items-center gap-2 w-full px-2 py-2">
      <Link to={`/`}>
        <FaArrowLeft />
      </Link>
      <Input
        placeholder="Search Open"
        className="rounded-full hover:bg-gray-200 border-zinc-50"
      />
      <MdOutlineGroupAdd
        size={35}
        color="gray"
        className="hover:bg-gray-200 cursor-pointer p-1 rounded-sm"
      />
    </div>
  );
};
