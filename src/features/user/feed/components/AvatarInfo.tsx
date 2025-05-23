import { AlertDialog } from "@/components/ui/alert-dialog";
import { User } from "@/types/user";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { BookmarkIcon, EditIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { IoIosMore } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDeletePostMutation } from "../api";
import { Sentitment } from "../components/Sentitment";
import { DeleteConfirmDialog } from "./diaglogs/DeleteConfirmDialog";
import { Dialog } from "@/components/ui/dialog";
import { EditPostDialog } from "./EditPostDialog";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";
interface AuthorInfoProps {
  author: User;
  updatedAt?: string;
  content: string;
  postId: number;
  isMine: boolean;
  sentiment: number;
  onDelete: (postId: number) => void;
}
export const AuthorInfo: React.FC<AuthorInfoProps> = (props) => {
  const author = props.author;
  const { enableAI } = useSelector((state: RootState) => state.settings);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const toggleShowDialog = () => setShowDialog((prev) => !prev);
  const toggleShowEditDialog = () => setShowEditDialog((prev) => !prev);
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const handleConfirmDelete = async () => {
    try {
      await deletePost(props.postId).unwrap();
      toast.info("Post deleted");
      props.onDelete(props.postId);
    } catch (error) {
      console.log("delete post failed ", error);
    }
  };
  return (
    <div id="author" className="flex justify-between ">
      <div className="flex items-center space-x-1 m-0">
        <Link className="font-bold" to={`/profile/${author.username}`}>
          {author.displayName}
        </Link>
        {author.verified && <MdVerified color="green" />}
        <Link
          className="text-sm text-gray-500 "
          to={`/profile/${author.username}`}
        >
          @{author.username}-{props.updatedAt}
        </Link>
      </div>
      <div>
        <div className="mr-4 flex space-x-2 ">
          {enableAI && props.sentiment > -1 && (
            <Sentitment sentiment={props.sentiment} />
          )}
          <Popover>
            <PopoverTrigger>
              <IoIosMore />
            </PopoverTrigger>
            <PopoverContent className="w-35 z-40 bg-white border rounded shadow-2xl">
              {props.isMine ? (
                <div className="flex flex-col space-y-1 cursor-pointer">
                  <div
                    onClick={toggleShowEditDialog}
                    className="flex items-center p-1 space-x-2 hover:bg-gray-500/20"
                  >
                    <EditIcon />
                    <p>Edit post</p>
                  </div>
                  <div
                    onClick={toggleShowDialog}
                    className="flex items-center p-1 space-x-2 hover:bg-gray-500/20"
                  >
                    <TrashIcon />
                    <p>Delete post</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-1 cursor-pointer">
                  <div className="flex items-center p-1 space-x-2 hover:bg-gray-500/20">
                    <BookmarkIcon />
                    <p>Saved post</p>
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <Dialog open={showEditDialog} onOpenChange={toggleShowEditDialog}>
          <EditPostDialog initialData={props.content} postId={props.postId} />
        </Dialog>
        <AlertDialog open={showDialog} onOpenChange={toggleShowDialog}>
          <DeleteConfirmDialog
            isLoading={isLoading}
            handleConfirmDelete={handleConfirmDelete}
          />
        </AlertDialog>
      </div>
    </div>
  );
};
