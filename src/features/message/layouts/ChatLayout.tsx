import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import { ConversationList } from "../components/ConversationList";
export const ChatLayout = () => {
  return (
    <div className="flex h-screen w-full items-center justify-cente px-1">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={25} minSize={5} maxSize={30}>
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col">
              <ConversationList />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={75}>
          <div className="flex h-full items-center justify-center">
            <Outlet />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
