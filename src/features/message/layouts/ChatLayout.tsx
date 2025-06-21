import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Link, Outlet } from "react-router-dom";
import { ConversationList } from "../components/ConversationList";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { ImageContainer } from "@/components/common/ImageContainer";
import { AVATAR } from "@/shared/constant";
export const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div className="w-full  flex justify-between fixed px-2 py-1">
      <Link to={"/feed"}>
        <ImageContainer className="size-10" src={"/logo2.png"} />
      </Link>
      <Link to={`/profile/${user?.username}`}>
        <ImageContainer className="size-10" src={user?.avatarUrl || AVATAR} />
      </Link>
    </div>
  );
};
export const ChatLayout = () => {
  return (
    <div>
      <Header />
      <div className="flex h-screen w-full items-center justify-cente px-1 pt-[50px]">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[200px] rounded-lg border md:min-w-[450px]"
        >
          <ResizablePanel defaultSize={20} minSize={5} maxSize={35}>
            <div className="flex-center">
              <ConversationList />
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
    </div>
  );
};
