import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { cn } from "@/lib/utils";
import { PhoneCall, VideoIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { setCallState, setRemoteUsername } from "../call/slice";

interface ChatHeaderProps {
  targetUsername: string;
  avatar?: string;
  isOnline: boolean;
}
export const ChatHeader: React.FC<ChatHeaderProps> = ({
  targetUsername,
  avatar,
  isOnline,
}) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center justify-between p-2 sticky top-0 z-10 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <div className="size-12 shrink-0 overflow-hidden rounded-full  border-2 border-primary">
          <img className="w-full h-full" src={avatar} alt={targetUsername} />
        </div>
        <div className="flex flex-col">
          <Link to={`/profile/${targetUsername}`}>
            <p className="text-sm font-semibold">{targetUsername}</p>
          </Link>
          <div className="flex items-center space-x-1">
            <p className="text-xs text-muted-foreground">
              {isOnline ? "Online" : "Offline"}
            </p>
            <div
              className={cn(
                "w-2 h-2 rounded-full  border border-white",
                isOnline ? "bg-green-500" : "bg-gray-400",
              )}
            ></div>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant={"ghost"}>
          <PhoneCall />
        </Button>
        <Button
          onClick={async () => {
            dispatch(setRemoteUsername(targetUsername));
            dispatch(setCallState("calling"));
          }}
          variant={"ghost"}
        >
          <VideoIcon />
        </Button>
      </div>
    </div>
  );
};
