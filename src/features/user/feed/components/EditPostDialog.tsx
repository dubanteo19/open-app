import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { FC, useState } from "react";
import { FaImage } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { useUpdatePostMutation } from "../api";
import { Loader } from "lucide-react";
interface EditPostDialogProps {
  initialData: string;
  postId: number;
}
export const EditPostDialog: FC<EditPostDialogProps> = ({
  initialData,
  postId,
}) => {
  const [content, setContent] = useState(initialData);
  const [editPost, { isLoading }] = useUpdatePostMutation();
  const handleOnSave = async () => {
    try {
      await editPost({ postId, payload: { content } });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit post</DialogTitle>
      </DialogHeader>
      <DialogDescription>You are editing post</DialogDescription>
      <div>
        <div className="col-span-11 flex flex-col">
          <div className="border-b-2 border-b-gray-200">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              maxLength={400}
              className="border-none resize-none focus-visible:border-none focus-visible:ring-0"
              placeholder="What's happening"
            />
          </div>
          <div className="flex justify-between text-primary mt-2 ">
            <div id="buttons">
              <Button variant="ghost">
                <FaImage />
              </Button>
              <Button variant="ghost">
                <MdEmojiEmotions />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button
          onClick={handleOnSave}
          disabled={isLoading || content.trim().length < 1}
          type="submit"
        >
          {isLoading && <Loader className="size-4 animate-spin" />}
          {isLoading ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};
