import { ImageContainer } from "@/components/common/ImageContainer";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AVATAR } from "@/shared/constant";
import { MicIcon, PhoneOff, ScreenShare, VideoOff } from "lucide-react";
import { FC } from "react";
interface CallSessionProps {
  localRef: React.RefObject<HTMLVideoElement>;
  remoteRef: React.RefObject<HTMLVideoElement>;
  onEndCall: () => void;
}
export const CallSession: FC<CallSessionProps> = ({
  localRef,
  remoteRef,
  onEndCall,
}) => {
  return (
    <DialogContent className="w-[1000px]  bg-yellow-100 max-w-full">
      <DialogHeader>
        <DialogTitle asChild>
          <div className="flex space-x-2">
            <ImageContainer className="size-12" src={AVATAR} />
            <h3>Tam, Minh</h3>
          </div>
        </DialogTitle>
      </DialogHeader>
      <div className="flex relative h-[500px] bg-red-50">
        <video className="w-full" autoPlay playsInline ref={remoteRef} />
        <video
          autoPlay
          className="absolute"
          playsInline
          width={150}
          ref={localRef}
          muted
        />
      </div>
      <div className="flex space-x-3 justify-center">
        <Button className="rounded-full size-12" variant={"outline"}>
          <ScreenShare />
        </Button>
        <Button className="rounded-full size-12" variant={"outline"}>
          <VideoOff />
        </Button>
        <Button className="rounded-full size-12" variant={"outline"}>
          <MicIcon />
        </Button>
        <Button
          className="rounded-full size-12 text-white"
          variant={"destructive"}
          onClick={onEndCall}
        >
          <PhoneOff />
        </Button>
      </div>
    </DialogContent>
  );
};
