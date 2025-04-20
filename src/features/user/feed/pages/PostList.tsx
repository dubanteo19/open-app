import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { uuid } from "@/lib/utils";
import { RootState } from "@/shared/store";
import { Post } from "@/types/post";
import { User } from "@/types/user";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { BookmarkIcon, EditIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { FaComment, FaEye, FaHeart } from "react-icons/fa6";
import { IoIosMore } from "react-icons/io";
import { MdVerified } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useDeletePostMutation } from "../api";
import { opendir } from "fs";
import { openDialog } from "../slice";
const AuthorInfo: React.FC<{
  author: User;
  updatedAt?: string;
  postId: number;
  isMine: boolean;
  handleOpenEditDialog?: () => void;
}> = (props) => {
  const author = props.author;
  const [showDialog, setshowDialog] = useState<boolean>(false);
  const toggleShowDialog = () => {
    return setshowDialog((prev) => !prev);
  };
  const [deletePost, { isLoading }] = useDeletePostMutation();
  const handleConfirmDelete = async () => {
    try {
      await deletePost(props.postId);
      toast.info("Post deleted");
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
      <div className="mr-4">
        <Popover>
          <PopoverTrigger>
            <div>
              <IoIosMore />
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-35 z-40 bg-white rounded shadow-2xl">
            {props.isMine ? (
              <div className="flex flex-col space-y-1 cursor-pointer">
                <div
                  onClick={props.handleOpenEditDialog}
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
        <AlertDialog open={showDialog} onOpenChange={toggleShowDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleConfirmDelete}
                disabled={isLoading}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};
const PostItem: React.FC<Post & { isMine: boolean }> = ({
  author,
  id,
  isMine,
  content,
  views,
  likes,
  comments,
  updatedAt,
}) => {
  const dispatch = useDispatch();
  const handleOpenEditDialog = () => {
    dispatch(openDialog({ postId: id, content }));
  };
  return (
    <div className="grid grid-cols-12 p-x-3 w-full  border-t-2 border-t-gray-200">
      <div className="col-span-1  flex flex-row-reverse ">
        <Avatar className="mr-2  mt-2 ">
          <AvatarImage
            width={40}
            className="rounded-full"
            src={
              author.avatarUrl ||
              "https://randomuser.me/api/portraits/men/9.jpg"
            }
          />
        </Avatar>
      </div>
      <div className="col-span-11 flex flex-col">
        <AuthorInfo
          handleOpenEditDialog={handleOpenEditDialog}
          isMine={isMine}
          author={author}
          postId={id}
          updatedAt={updatedAt?.substring(0, 7)}
        />
        <div className="lg:my-1">{content}</div>
        <div className="flex w-full">
          <Button variant="ghost">
            <FaHeart />
            {likes || 0}
          </Button>
          <Button variant="ghost">
            <FaEye />
            {views || 0}
          </Button>
          <Button variant="ghost">
            <FaComment />
            {comments || 0}
          </Button>
        </div>
      </div>
    </div>
  );
};
interface PostListProps {
  posts?: Post[];
}
export const PostList: React.FC<PostListProps> = ({ posts }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="flex flex-col px-2 w-full">
      {posts &&
        posts.map((post) => (
          <PostItem
            {...post}
            isMine={user?.id == post.author.id}
            key={uuid()}
          />
        ))}
    </div>
  );
};
