import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn, formatTime } from "@/lib/utils";
import { AVATAR } from "@/shared/constant";
import { Post } from "@/types/post";
import { FaComment, FaEye, FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { AuthorInfo } from "./AvatarInfo";
interface PostItemProps {
  post: Post;
  onToggleLike: (postId: number) => void;
  onDelete?: (postId: number) => void;
}
export const PostItem: React.FC<PostItemProps> = ({
  post,
  onToggleLike,
  onDelete,
}) => {
  const navigate = useNavigate();
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
          onDelete={onDelete!}
        />
        <div
          className="lg:my-1 cursor-pointer wrap-break-word whitespace-pre-wrap"
          onClick={() => navigate(`/${post.author.username}/post/${post.id}`)}
        >
          {post.content}
        </div>
        <div className="flex w-full">
          <Button variant="ghost" onClick={() => onToggleLike(post.id)}>
            <FaHeart
              className={cn(
                "transition-all duration-300 ease-in ",
                post.liked && "text-red-500 scale-110 ",
              )}
            />
            {post.likeCount}
          </Button>
          <Button variant="ghost">
            <FaEye />
            {post.viewCount}
          </Button>
          <Button variant="ghost">
            <FaComment />
            {post.commentCount}
          </Button>
        </div>
      </div>
    </div>
  );
};
