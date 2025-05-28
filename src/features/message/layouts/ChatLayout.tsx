import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet, useParams } from "react-router-dom";
export const ChatLayout = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  return (
    <div className="flex h-screen w-full items-center justify-cente px-1">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[200px] rounded-lg border md:min-w-[450px]"
      >
        <ResizablePanel defaultSize={25} minSize={5} maxSize={30}>
          <div className="flex h-full items-center justify-center">
            {conversationId}
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
