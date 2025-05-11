import { formatTime, uuid } from "@/lib/utils";
import { CommentResponse } from "../../comment/dto/comment";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const CommentItem: React.FC<CommentResponse> = (prop) => {
  return (
    <div className="flex px-4 space-x-2  ">
      <div className="size-6 rounded-full overflow-hidden ">
        <img className="w-full h-full" src={prop.author.avatarUrl} />
      </div>
      <div className="bg-gray-200/40 p-1 rounded-2xl">
        <div className="flex justify-between space-x-3">
          <Link to={`/profile/${prop.author.username}`}>
            <strong>{prop.author.username}</strong>
          </Link>
          <p className="text-sm text-gray-500">{formatTime(prop.updatedAt)}</p>
        </div>
        <article className="text-pretty   max-w-[500px]">
          <p className="break-words ">{prop.content}</p>
        </article>
        <div className="flex space-x-2">
          <Button variant="link">Like</Button>
          <Button variant="link">Reply</Button>
        </div>
      </div>
    </div>
  );
};

interface CommentListProps {
  comments: CommentResponse[];
  isLoading?: boolean;
}
export const CommentList: React.FC<CommentListProps> = ({
  comments,
  isLoading,
}) => {
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col space-y-2">
      {comments.map((comment) => (
        <CommentItem key={uuid()} {...comment} />
      ))}
    </div>
  );
};
