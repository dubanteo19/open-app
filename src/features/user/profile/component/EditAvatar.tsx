import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { useLazyGetImagesQuery, useUpdateAvatarMutation } from "../api";
interface EditProfileFormProps {
  openerId: number;
  onSave: () => void;
  avatarUrl: string;
}
export const EditAvatar: FC<EditProfileFormProps> = ({
  openerId,
  onSave,
  avatarUrl,
}) => {
  const [avatar, setAvatar] = useState<string>(avatarUrl);
  const [trigger, { data: images, isFetching }] = useLazyGetImagesQuery();
  const [updateAvatar, { isLoading }] = useUpdateAvatarMutation();
  const handleSearch = async () => {
    if (q.trim()) {
      trigger(q);
    }
  };
  const handleUpdateAvatar = async () => {
    try {
      const data = { avatarUrl: avatar, openerId };
      console.log(data);
      await updateAvatar(data).unwrap();
      onSave();
    } catch (error) {
      console.log(error);
    }
  };
  const [q, setQ] = useState<string>("");
  console.log(images);
  return (
    <DialogContent className="min-w-[800px]">
      <DialogHeader>
        <DialogTitle className="text-center">Avatar Picker</DialogTitle>
      </DialogHeader>
      <div className="flex space-y-3 flex-col">
        <div className="size-28 rounded-full overflow-hidden mx-auto">
          <img className="w-full h-full" src={avatar} />
        </div>
        <Button onClick={handleUpdateAvatar} disabled={isLoading}>
          Save
        </Button>
        <div className="flex flex-col mt-4 space-y-2">
          <Input
            value={q}
            placeholder="Enter your keyword to search image"
            onChange={(e) => setQ(e.target.value)}
          />
          <Button
            variant={"outline"}
            onClick={handleSearch}
            disabled={isFetching}
          >
            {isFetching ? "Searching" : "Search"}
          </Button>
          <div className="grid grid-cols-5 gap-2 mt-4">
            {images &&
              images.length > 0 &&
              images.map((imgUrl) => (
                <img
                  key={imgUrl}
                  src={imgUrl}
                  onClick={() => setAvatar(imgUrl)}
                  className={`cursor-pointer rounded-md border-2 ${
                    avatar === imgUrl ? "border-blue-500" : "border-transparent"
                  }`}
                />
              ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );
};
