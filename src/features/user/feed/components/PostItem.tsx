import { Post } from "@/types/post";
import { FaComment, FaEye, FaHeart } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { formatTime } from "@/lib/utils";
import { AuthorInfo } from "./AvatarInfo";
export const PostItem: React.FC<Post & { isMine: boolean }> = ({
  author,
  id,
  isMine,
  content,
  viewCount,
  likeCount,
  commentCount,
  sentiment,
  updatedAt,
}) => {
  const navigate = useNavigate();
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
          isMine={isMine}
          author={author}
          content={content}
          postId={id}
          updatedAt={formatTime(updatedAt!)}
          sentiment={sentiment}
        />
        <div
          className="lg:my-1 cursor-pointer wrap-break-word"
          onClick={() => navigate(`/${author.username}/post/${id}`)}
        >
          {content}
        </div>
        <div className="flex w-full">
          <Button variant="ghost">
            <FaHeart />
            {likeCount || 0}
          </Button>
          <Button variant="ghost">
            <FaEye />
            {viewCount || 0}
          </Button>
          <Button variant="ghost">
            <FaComment />
            {commentCount || 0}
          </Button>
        </div>
      </div>
    </div>
  );
};
