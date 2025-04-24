import { Loader } from "@/components/common/Loader";
import { Button } from "@/components/ui/button";
import { EditPostDialog } from "@/shared/components/EditPostDialog";
import { useState } from "react";
import { PostForm } from "./PostForm";
import { PostList } from "./PostList";
import { PageRequest } from "@/types/page";
import { useGetPostsQuery } from "../api";

export const FeedPage = () => {
  const [page] = useState<PageRequest>({ page: 0, size: 10 });
  const { data: posts, isLoading } = useGetPostsQuery(page);
  return (
    <div className="flex flex-col ">
      {isLoading && <Loader />}
      <EditPostDialog />
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
      <div>
        <PostForm />
        <PostList posts={posts?.content} />
      </div>
    </div>
  );
};
