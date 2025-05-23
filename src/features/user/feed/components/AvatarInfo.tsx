import { AlertDialog } from "@/components/ui/alert-dialog";
import { Dialog } from "@/components/ui/dialog";
import { RootState } from "@/shared/store";
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
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useBookmarkMutation, useDeletePostMutation } from "../api";
import { Sentitment } from "../components/Sentitment";
import { DeleteConfirmDialog } from "./diaglogs/DeleteConfirmDialog";
import { EditPostDialog } from "./EditPostDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
interface AuthorInfoProps {
  author: User;
  updatedAt?: string;
  content: string;
  postId: number;
  isMine: boolean;
  sentiment: number;
  bookmarked: boolean;
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
  const [bookmarkPost] = useBookmarkMutation();
  const handleBookmark = async () => {
    try {
      await bookmarkPost(props.postId).unwrap();
    } catch (error) {
      console.log(error);
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
            <PopoverContent className=" z-40 bg-white border rounded shadow-2xl">
              {props.isMine ? (
                <div className="flex flex-col space-y-1 cursor-pointer">
                  <Button onClick={toggleShowEditDialog} variant={"ghost"}>
                    <EditIcon />
                    Edit
                  </Button>
                  <Button onClick={toggleShowDialog} variant={"ghost"}>
                    <TrashIcon />
                    Delete
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleBookmark}
                  disabled={props.bookmarked}
                  variant={"ghost"}
                  className="flex cursor-pointer"
                >
                  <BookmarkIcon
                    className={cn(props.bookmarked && "text-yellow-500")}
                  />
                  Bookmark
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <Dialog open={showEditDialog} onOpenChange={toggleShowEditDialog}>
          <EditPostDialog
            onEdit={toggleShowEditDialog}
            initialData={props.content}
            postId={props.postId}
          />
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
