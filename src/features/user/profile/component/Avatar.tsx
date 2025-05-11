import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { AVATAR } from "@/shared/constant";
import { useState } from "react";
import { EditProfileForm } from "./EditProfileForm";
import { Edit } from "lucide-react";
import { EditAvatar } from "./EditAvatar";
interface AvatarProps {
  openerId: number;
  displayName: string;
  bio: string;
  avatarUrl: string;
  location: string;
  isMine: boolean;
}

export const Avatar: React.FC<AvatarProps> = (userInfo) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openAvatarDialog, setOpenAvatarDialog] = useState<boolean>(false);
  return (
    <div className="flex  flex-col">
      <div className="h-46  bg-gradient-to-r from-pink-400 to-purple-600"></div>
      <div className="relative  px-6 h-16">
        <div className="absolute -top-16">
          <div className="relative">
            <img
              className="size-32 rounded-full border-4 border-white"
              src={userInfo.avatarUrl || AVATAR}
              alt="Avatar"
            />
            <Button
              variant="ghost"
              onClick={() => setOpenAvatarDialog(true)}
              className="absolute rounded-full -right-4 bottom-2"
            >
              <Edit />
            </Button>
          </div>
        </div>
        <div className="text-right  pt-6 absolute right-0">
          {userInfo.isMine && (
            <Button onClick={() => setOpenDialog(true)} variant={"ghost"}>
              Edit profile
            </Button>
          )}
        </div>
      </div>

      <Dialog open={openAvatarDialog} onOpenChange={setOpenAvatarDialog}>
        <EditAvatar {...userInfo} onSave={() => setOpenAvatarDialog(false)} />
      </Dialog>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <EditProfileForm {...userInfo} onSave={() => setOpenDialog(false)} />
      </Dialog>
    </div>
  );
};
