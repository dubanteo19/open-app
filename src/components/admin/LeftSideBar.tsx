import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
}
export const LeftSideBar: React.FC<Props> = ({ className }) => {
  return <div className={cn("flex flex-col", className)}></div>;
};
