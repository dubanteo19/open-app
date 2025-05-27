import {
  useLikePostMutation,
  useUnlikePostMutation,
} from "@/features/user/feed/api";
import { CursorPagedRequest, CursorPagedResponse } from "@/types/page";
import { Post } from "@/types/post";
import { useCallback, useEffect, useRef, useState } from "react";
import { useInfiniteScroll } from "./useInfiniteScroll";

export interface PostQueryResutl {
  data?: CursorPagedResponse<Post>;
  isLoading: boolean;
  isFetching: boolean;
}

export const usePaginatedPosts = <T extends Record<string, unknown>>(
  queryFn: (arg: CursorPagedRequest<T>) => PostQueryResutl,
  args: T,
) => {
  const [after, setAfter] = useState<number | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const {
    data: pageResponse,
    isLoading,
    isFetching,
  } = queryFn({ after, args });
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
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();

  const handleDeletePost = (postId: number) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  const handleEditPost = (postId: number, newContent: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              content: newContent,
            }
          : p,
      ),
    );
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
  const refetch = () => {
    setPosts([]);
    setAfter(null);
  };
  return {
    posts,
    isLoading,
    isFetching,
    observerRef,
    handleDeletePost,
    handleLikeToggle,
    handleEditPost,
    refetch,
  };
};
