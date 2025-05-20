import { Loader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Post } from "@/types/post";
import { LoaderIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGetPostsQuery } from "../api";
import { PostForm } from "../components/PostForm";
import { PostList } from "../components/PostList";

export const FeedPage = () => {
  const [page, setPage] = useState<number>(0);
  const {
    data: pageResponse,
    isLoading,
    isFetching,
  } = useGetPostsQuery({
    page,
    size: 8,
  });
  const [posts, setPosts] = useState<Post[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (pageResponse) {
      setPosts((prev) =>
        pageResponse.pageNumber == 0
          ? pageResponse.content
          : [...prev, ...pageResponse.content],
      );
    }
  }, [pageResponse]);

  const handleShowMore = useCallback(() => {
    if (!pageResponse?.isLast) {
      setPage((prev) => prev + 1);
    }
  }, [pageResponse]);
  useInfiniteScroll(observerRef, {
    isFetching,
    hasMore: !pageResponse?.isLast,
    callback: handleShowMore,
  });
  const onPostCreated = () => {
    setPage(0);
  };
  return (
    <div className="flex flex-col ">
      {isLoading && <Loader />}
      <div className="top-0  z-10  h-14  flex bg-white dark:bg-gray-900  sticky">
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
        <div ref={observerRef} className="flex-center h-10 my-4">
          {isFetching && <LoaderIcon className="animate-spin" />}
        </div>
      </div>
    </div>
  );
};
