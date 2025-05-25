import { Loader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RootState } from "@/shared/store";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { FC, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { MdEmojiEmotions } from "react-icons/md";
import { useSelector } from "react-redux";
import { useCreatePostMutation } from "../api";
import { handleError } from "../util";
import { AlertDialog } from "@/components/ui/alert-dialog";
import { ErrorAlertDialog } from "./diaglogs/ErrorAlertDialog";
import { ErrorCode } from "@/shared/errorCode";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { logout } from "@/features/auth/slice";

interface PostFormProps {
  onPostCreated: () => void;
}
export const PostForm: FC<PostFormProps> = ({ onPostCreated }) => {
  const [content, setcontent] = useState<string>("");
  const [createPost, { isLoading }] = useCreatePostMutation();
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const [errorDialog, setErrorDialog] = useState<{
    open: boolean;
    message: string;
  }>({ message: "", open: false });
  const errorMessageCallback = (message: string, code: ErrorCode) => {
    if (code === ErrorCode.OPENER_BLOCKED) {
      dispatch(logout());
    }
    setErrorDialog({ open: true, message });
  };
  const handleSubmit = async () => {
    try {
      await createPost({ openerId: user?.id, payload: { content } }).unwrap();
      setcontent("");
      onPostCreated();
    } catch (error) {
      handleError(error, errorMessageCallback);
    }
  };
  return (
    <div className="grid grid-cols-12 p-3 border-t-2 border-t-gray-200">
      {isLoading && <Loader />}
      <div className="col-span-1">
        <div className="rounded-full overflow-hidden size-12">
          <img src={user?.avatarUrl} />
        </div>
      </div>
      <div className="col-span-11 flex flex-col">
        <div className="border-b-2 border-b-gray-200">
          <Textarea
            value={content}
            onChange={(event) => {
              setcontent(event.target.value);
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
          <div>
            <Button
              className="px-6 rounded-full"
              disabled={isLoading || !content.trim()}
              type="submit"
              onClick={handleSubmit}
            >
              Post
            </Button>
          </div>
        </div>
      </div>
      <AlertDialog
        open={errorDialog.open}
        onOpenChange={(open) => setErrorDialog({ open, message: "" })}
      >
        <ErrorAlertDialog message={errorDialog.message} />
      </AlertDialog>
    </div>
  );
};
