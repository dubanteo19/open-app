import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, formatTime } from "@/lib/utils";
import { AVATAR } from "@/shared/constant";
import { Post } from "@/types/post";
import { FaComment, FaEye, FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { AuthorInfo } from "./AvatarInfo";
import { useState } from "react";
import { PostLikeList } from "./PostLikeList";
import { Dialog } from "@/components/ui/dialog";
interface PostItemProps {
  post: Post;
  onToggleLike: (postId: number) => void;
  onDelete?: (postId: number) => void;
  onEdit: (postId: number, newContent: string) => void;
}
export const PostItem: React.FC<PostItemProps> = ({
  post,
  onToggleLike,
  onDelete,
  onEdit,
}) => {
  const navigate = useNavigate();
  const [showPostLike, setShowPostLike] = useState<boolean>(false);
  const toggleShowPostLike = () => {
    if (post.likeCount > 0) setShowPostLike((prev) => !prev);
  };
  return (
    <div className="grid grid-cols-12 p-x-3 w-full  border-t-2 border-t-gray-200">
      <div className="col-span-1  flex flex-row-reverse ">
        <Avatar className="mr-2  mt-2 ">
          <AvatarImage
            width={40}
            className="rounded-full"
            src={post.author.avatarUrl || AVATAR}
          />
        </Avatar>
      </div>
      <div className="col-span-11 flex flex-col">
        <AuthorInfo
          isMine={post.mine}
          author={post.author}
          content={post.content}
          bookmarked={post.bookmarked}
          postId={post.id}
          updatedAt={formatTime(post.updatedAt!)}
          sentiment={post.sentiment}
          onEdit={onEdit}
          onDelete={onDelete!}
        />
        <div className="lg:my-1  wrap-break-word py-2 whitespace-pre-wrap">
          {post.content}
        </div>
        <div className="flex w-full space-x-5">
          <Button
            variant={"ghost"}
            className="flex space-x-2 px-2 items-center "
            onClick={toggleShowPostLike}
          >
            <FaHeart className="text-primary" />
            <p>{post.likeCount}</p>
            {showPostLike && (
              <Dialog open={showPostLike} onOpenChange={toggleShowPostLike}>
                <PostLikeList postId={post.id} />
              </Dialog>
            )}
          </Button>
          <div className="flex space-x-2 px-2 items-center">
            <FaEye />
            <p>{post.viewCount}</p>
          </div>
          <div className="flex space-x-2 px-2 items-center">
            <FaComment />
            <p>{post.commentCount}</p>
          </div>
        </div>
        <div className="flex border-t-2 border-t-gray-300  justify-center w-full mx-5 px-2 my-2 space-x-2">
          <Button
            className="w-full"
            variant="ghost"
            onClick={() => onToggleLike(post.id)}
          >
            <FaHeart
              className={cn(
                "transition-all duration-300 ease-in  ",
                post.liked && "text-red-500 scale-110 ",
              )}
            />
            Like
          </Button>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => navigate(`/${post.author.username}/post/${post.id}`)}
          >
            Comment
          </Button>
        </div>
      </div>
    </div>
  );
};
