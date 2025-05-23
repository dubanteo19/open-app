import { Loader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { Post } from "@/types/post";
import { LoaderIcon } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useGetPostsQuery } from "../api";
import { PostForm } from "../components/PostForm";
import { PostItem } from "../components/PostItem";
import { useLikePostMutation, useUnlikeMutation } from "../../metadata/api";

export const FeedPage = () => {
  const [after, setAfter] = useState<number | null>(null);
  const {
    data: pageResponse,
    isLoading,
    isFetching,
  } = useGetPostsQuery({ after });
  const [posts, setPosts] = useState<Post[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (pageResponse) {
      setPosts((prev) => {
        const newPosts = pageResponse.items.filter(
          (p) => !prev.some((x) => x.id === p.id),
        );
        return [...prev, ...newPosts];
      });
    }
  }, [pageResponse]);
  const loadMore = useCallback(() => {
    if (pageResponse?.hasMore && pageResponse.nextCursor) {
      setAfter(pageResponse.nextCursor);
    }
  }, [pageResponse?.hasMore, pageResponse?.nextCursor]);
  useInfiniteScroll(observerRef, {
    isFetching,
    hasMore: pageResponse?.hasMore,
    callback: loadMore,
  });
  const onPostCreated = () => {
    setPosts([]);
    setAfter(null);
  };
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikeMutation();

  const handleDeletePost = (postId: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };
  const handleLikeToggle = async (postId: number) => {
    const selectedPost = posts.find((p) => p.id === postId);
    const liked = selectedPost?.liked;
    const triggerUpdateLike = liked ? unlikePost : likePost;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              likeCount: liked ? p.likeCount - 1 : p.likeCount + 1,
              liked: !liked,
            }
          : p,
      ),
    );
    try {
      triggerUpdateLike(postId).unwrap();
    } catch (error) {
      console.log(error);
    }
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
        {posts.length > 0 && (
          <div className="flex flex-col px-2 w-full">
            {posts.map((post) => (
              <PostItem
                post={post}
                onToggleLike={handleLikeToggle}
                onDelete={handleDeletePost}
                key={post.id}
              />
            ))}
          </div>
        )}
        <div ref={observerRef} className="flex-center h-10 my-4">
          {isFetching && <LoaderIcon className="animate-spin" />}
        </div>
      </div>
    </div>
  );
};
