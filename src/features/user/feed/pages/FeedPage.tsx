import { Loader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { PostForm } from "./PostForm";
import { PostList } from "./PostList";
import { useGetPostsQuery } from "../api";
import { Post } from "@/types/post";

export const FeedPage = () => {
  const [page, setPage] = useState<number>(0);
  const { data: pageResponse, isLoading } = useGetPostsQuery({
    page,
    size: 5,
  });
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    if (pageResponse) {
      setPosts((prev) =>
        pageResponse.pageNumber == 0
          ? pageResponse.content
          : [...prev, ...pageResponse.content],
      );
    }
  }, [pageResponse]);
  const onPostCreated = () => {
    setPage(0);
  };
  const handleShowMore = () => {
    setPage((prev) => prev + 1);
  };
  return (
    <div className="flex flex-col ">
      {isLoading && <Loader />}
      <div className="top-0  z-10  h-14  flex bg-white   sticky">
        <Button
          variant="ghost"
          className="font-bold border-b-3 border-b-primary flex-1 rounded-none"
        >
          For you
        </Button>
        <Button className="flex-1" variant="ghost">
          Following
        </Button>
      </div>
      <div className="flex flex-col">
        <PostForm onPostCreated={onPostCreated} />
        {posts.length > 0 && <PostList posts={posts} />}
        <div className="mx-auto my-2">
          <Button
            onClick={handleShowMore}
            disabled={isLoading || pageResponse?.isLast}
          >
            Show more
          </Button>
        </div>
      </div>
    </div>
  );
};
