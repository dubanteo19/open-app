import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ChatContent } from "../layouts/ChatContent";
import { ConversationList } from "../layouts/ConversationList";
import { conversationList } from "../dto/data";


export const ChatPage = () => {
    return (
        <div className="flex h-screen w-full items-center justify-cente px-1">
            <ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border md:min-w-[450px]">
                <ResizablePanel defaultSize={25} minSize={5} maxSize={30}>
                    <div className="flex h-full items-center justify-center">
                        <ConversationList/>
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={75}>
                    <div className="flex h-full items-center justify-center">
                        <ChatContent/>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}