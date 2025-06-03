import { ImageContainer } from "@/components/common/ImageContainer";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AVATAR } from "@/shared/constant";
import { PhoneIcon, XIcon } from "lucide-react";
import { FC } from "react";

interface IncomingCallProps {
  onAccept: () => void;
  onReject: () => void;
}
export const IncomingCall: FC<IncomingCallProps> = ({ onAccept, onReject }) => {
  return (
    <DialogContent className="w-[300px]">
      <DialogHeader>
        <DialogTitle asChild>
          <p className="text-center">Incoming call</p>
        </DialogTitle>
      </DialogHeader>
      <div className="flex-center flex-col">
        <ImageContainer className="size-12" src={AVATAR} />
        <h3>Du ban teo is calling you</h3>
        <div className="flex space-x-5">
          <div className="flex flex-col items-center">
            <Button
              className="rounded-full size-10 text-white"
              variant="destructive"
              onClick={onReject}
            >
              <XIcon />
            </Button>
            Reject
          </div>
          <div className="flex flex-col items-center">
            <Button
              onClick={onAccept}
              className="rounded-full size-10 text-white bg-green-500 animate-pulse"
            >
              <PhoneIcon />
            </Button>
            Accept
          </div>
        </div>
      </div>
    </DialogContent>
  );
};
