import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  title?: string;
  avatar?: string;
  isOnline: boolean;
}
export const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  avatar,
  isOnline,
}) => {
  return (
    <div className="flex items-center justify-between p-2 sticky top-0 z-10 border-b border-gray-200">
      <div className="flex items-center space-x-2">
        <div className="relative flex size-12 shrink-0 overflow-hidden rounded-full  border-2 border-primary">
          <img src={avatar} alt={title} />
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">{title ? title : "User name"}</p>
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
      <div className="flex items-center space-x-2"></div>
    </div>
  );
};
