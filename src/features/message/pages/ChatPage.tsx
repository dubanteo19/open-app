import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { useParams } from "react-router-dom";
import { conversationDetailList } from "../dto/data";
import { ChatWindow } from "../layouts/ChatWindow";
import { ConversationList } from "../layouts/ConversationList";


export const ChatPage = () => {
    const { conversationId } = useParams<{ conversationId: string }>();
    const numericConversationId = parseInt(conversationId || "", 10);
    // const { conversationId } = useSelector((state: RootState) => state.chat);
    const conversationDetail = conversationDetailList.find(c => c.conversation.id === numericConversationId);

    return ( 
        <div className="flex h-screen w-full items-center justify-cente px-1">
            <ResizablePanelGroup direction="horizontal" className="min-h-[200px] rounded-lg border md:min-w-[450px]">
                <ResizablePanel defaultSize={25} minSize={5} maxSize={30}>
                    <div className="flex h-full items-center justify-center">
                        <ConversationList />
                    </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={75}>
                    <div className="flex h-full items-center justify-center">
                        {conversationId && conversationDetail ?
                            <ChatWindow key={conversationId} conversationId={numericConversationId} conversationDetail={conversationDetail}/>
                            : "Welcom to Open Chat! Please select a conversation to start chatting."
                        }
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
}