import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import { News } from "./News";
import { RecommendedFollows } from "./RecommendedFollows";
const SearchBar: React.FC = () => {
  return (
    <div>
      <Input placeholder="Search Open" className="rounded-full" />
    </div>
  );
};
interface Props {
  className?: string;
}
export const RightSideBar: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn("flex flex-col gap-y-2 mt-2", className)}>
      <SearchBar />
      <News />
      <RecommendedFollows />
      <div className="text-sm">
        <p>Terms of Service Privacy Policy Cookie Policy</p>
        <p>Ads info More © 2021 Twitter, Inc.</p>
      </div>
    </div>
  );
};
