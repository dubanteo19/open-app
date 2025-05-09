import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useUpdatePostMutation } from "@/features/user/feed/api";
import { FaImage } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
export const EditPostDialog = () => {
  const [editPost, { isLoading }] = useUpdatePostMutation();
  const handleSubmitSave = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit post</DialogTitle>
        </DialogHeader>
        <DialogDescription>You are editing post</DialogDescription>
        <div>
          <div className="col-span-11 flex flex-col">
            <div className="border-b-2 border-b-gray-200">
              <Textarea
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
          <Button type="submit" onClick={handleSubmitSave}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
