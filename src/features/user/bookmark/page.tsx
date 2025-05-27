import { Loader } from "@/components/common/Loader";
import { usePaginatedPosts } from "@/hooks/usePaginatedPost";
import { LoaderIcon } from "lucide-react";
import { useGetBookmarkedPostsQuery } from "../feed/api";
import { PostList } from "../feed/components/PostList";

export const BookMarkPage = () => {
  const {
    posts,
    observerRef,
    isLoading,
    isFetching,
    handleLikeToggle,
    handleDeletePost,
    handleEditPost,
  } = usePaginatedPosts(useGetBookmarkedPostsQuery, {});
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col ">
      <h3>Bookmarked Posts</h3>
      <PostList
        handleEdit={handleEditPost}
        posts={posts}
        handleDelete={handleDeletePost}
        handleLikeToggle={handleLikeToggle}
      />
      <div ref={observerRef} className="flex-center h-10 my-4">
        {isFetching && <LoaderIcon className="animate-spin" />}
      </div>
    </div>
  );
};
