import { FC } from "react";
import { useGetPostLikesQuery } from "../api";
import { Loader } from "lucide-react";
import { FaDice, FaHeart } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { PostLike } from "../dto/response/PostLike";
import { formatTime } from "@/lib/utils";
import { DialogContent } from "@/components/ui/dialog";

const PostLikeItem: FC<PostLike> = ({ likedBy, likedAt }) => {
  return (
    <div className="flex items-center justify-between ">
      <div className="flex  space-x-2">
        <div className="relative">
          <div className="size-12 overflow-hidden rounded-full">
            <img src={likedBy.avatarUrl} />
          </div>
          <FaHeart className=" absolute bottom-[-5px] right-0 duration-300  text-red-500 animate-pulse" />
        </div>
        <div>
          <p className="text-xs text-gray-500">
            Liked at {formatTime(likedAt)}
          </p>
          <p>@{likedBy.username}</p>
        </div>
      </div>
      <Button variant={"outline"}>
        <FaDice />
        Following
      </Button>
    </div>
  );
};

interface PostLikeList {
  postId: number;
}
export const PostLikeList: FC<PostLikeList> = ({ postId }) => {
  const { data, isLoading } = useGetPostLikesQuery(Number(postId));
  console.log(data);
  return (
    <DialogContent>
      <div className=" bg-gray-200 rounded  p-2  border z-10 mt-5">
        {isLoading && <Loader />}
        <div className="flex flex-col space-y-2">
          {data?.map((postLike) => (
            <PostLikeItem {...postLike} key={postLike.likedAt} />
          ))}
        </div>
      </div>
    </DialogContent>
  );
};
