import { Loader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { usePaginatedPosts } from "@/hooks/usePaginatedPost";
import { LoaderIcon } from "lucide-react";
import { useGetPostsQuery } from "../api";
import { PostForm } from "../components/PostForm";
import { PostList } from "../components/PostList";
export const FeedPage = () => {
  const {
    posts,
    observerRef,
    isLoading,
    isFetching,
    handleLikeToggle,
    handleEditPost,
    handleDeletePost,
    refetch,
  } = usePaginatedPosts(useGetPostsQuery, {});
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col ">
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
        <PostForm onPostCreated={refetch} />
        <PostList
          posts={posts}
          handleEdit={handleEditPost}
          handleDelete={handleDeletePost}
          handleLikeToggle={handleLikeToggle}
        />
        <div ref={observerRef} className="flex-center h-10 my-4">
          {isFetching && <LoaderIcon className="animate-spin" />}
        </div>
      </div>
    </div>
  );
};
