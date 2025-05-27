import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { RootState } from "@/shared/store";
import { User } from "@/types/user";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { EditIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { FaBookmark } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { MdReport, MdVerified } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  useBookmarkMutation,
  useDeletePostMutation,
  useUnbookmarkMutation,
} from "../api";
import { Sentitment } from "../components/Sentitment";
import { DeleteConfirmDialog } from "./diaglogs/DeleteConfirmDialog";
import { EditPostDialog } from "./EditPostDialog";
interface AuthorInfoProps {
  author: User;
  updatedAt?: string;
  content: string;
  postId: number;
  isMine: boolean;
  sentiment: number;
  bookmarked: boolean;
  onDelete: (postId: number) => void;
  onEdit: (postId: number, newContent: string) => void;
}
export const AuthorInfo: React.FC<AuthorInfoProps> = (props) => {
  const author = props.author;
  const [localBookmark, setLocalBookmark] = useState<boolean>(props.bookmarked);
  const { enableAI } = useSelector((state: RootState) => state.settings);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showEditDialog, setShowEditDialog] = useState<boolean>(false);
  const toggleShowDialog = () => setShowDialog((prev) => !prev);
  const toggleShowEditDialog = (postId: number, newContent: string) => {
    setShowEditDialog((prev) => !prev);
    props.onEdit(postId, newContent);
  };
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const [bookmarkPost] = useBookmarkMutation();
  const [unbookmarkPost] = useUnbookmarkMutation();
  const handleConfirmDelete = async () => {
    try {
      await deletePost(props.postId).unwrap();
      toast.info("Post deleted");
      props.onDelete(props.postId);
    } catch (error) {
      console.log("delete post failed ", error);
    }
  };
  const handleBookmark = async () => {
    try {
      const mutation = localBookmark ? unbookmarkPost : bookmarkPost;
      mutation(props.postId).unwrap();
      toast.success("Bookmarked post updated");
      setLocalBookmark((prev) => !prev);
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
        <div className="mr-4 flex space-x-2  ">
          {enableAI && props.sentiment > -1 && (
            <Sentitment sentiment={props.sentiment} />
          )}
          <Popover>
            <PopoverTrigger>
              <IoIosMore />
            </PopoverTrigger>
            <PopoverContent className=" z-40   bg-white border rounded shadow-2xl">
              {props.isMine ? (
                <div className="flex flex-col ">
                  <Button
                    onClick={() => setShowEditDialog((prev) => !prev)}
                    variant={"ghost"}
                    className=" justify-start"
                  >
                    <EditIcon />
                    Edit Post
                  </Button>
                  <Button
                    onClick={toggleShowDialog}
                    className=" justify-start"
                    variant={"ghost"}
                  >
                    <TrashIcon />
                    Delete Post
                  </Button>
                  <Button
                    onClick={handleBookmark}
                    className=" justify-start"
                    variant={"ghost"}
                  >
                    <FaBookmark
                      className={cn(localBookmark && "text-yellow-500")}
                    />
                    Bookmark Post
                  </Button>
                </div>
              ) : (
                <div>
                  <Button
                    onClick={handleBookmark}
                    variant={"ghost"}
                    className="flex "
                  >
                    <FaBookmark
                      className={cn(localBookmark && "text-yellow-500")}
                    />
                    Bookmark Post
                  </Button>
                  <Button variant={"ghost"} className="flex ">
                    <MdReport className="text-error" />
                    Report Post
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </div>
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
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
