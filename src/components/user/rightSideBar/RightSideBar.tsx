import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
    toggleDarkMode,
    toggleEnableAI,
} from "@/features/common/settings/slice";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
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
  const settings = useAppSelector((state) => state.settings);
  const dispatch = useAppDispatch();
  return (
    <div className={cn("flex flex-col gap-y-2 mt-2", className)}>
      <div className="flex space-x-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="enable-ai"
            onCheckedChange={() => dispatch(toggleEnableAI())}
            checked={settings.enableAI}
          />
          <Label htmlFor="enable-ai">Enable AI</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch
            id="darkMode"
            onCheckedChange={() => dispatch(toggleDarkMode())}
            checked={settings.darkMode}
          />
          <Label htmlFor="darkMode">
            {settings.darkMode ? "Dark Mode 🌙" : "Light Mode ☀️"}
          </Label>
        </div>
      </div>
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
