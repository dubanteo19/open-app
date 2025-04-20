import { Loader } from "@/components/common/Loader";
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
import { changeContent, closeDialog } from "@/features/user/feed/slice";
import { RootState } from "@/shared/store";
import { FaImage } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
export const EditPostDialog = () => {
  const { content, showDialog, postId } = useSelector(
    (state: RootState) => state.post,
  );
  const dispatch = useDispatch();
  const [editPost, { isLoading }] = useUpdatePostMutation();
  const handleSubmitSave = async () => {
    try {
      if (content) {
        const re = await editPost({
          postId: postId,
          payload: { content },
        }).unwrap();
        if (re) {
          toast.success("Post updated");
          dispatch(closeDialog());
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={showDialog} onOpenChange={() => dispatch(closeDialog())}>
      {isLoading && <Loader />}
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
                onChange={(event) => {
                  dispatch(changeContent(event.target.value));
                }}
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
            type="submit"
            disabled={isLoading || !content}
            onClick={handleSubmitSave}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
