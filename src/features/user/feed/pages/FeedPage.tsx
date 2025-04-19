import { Button } from "@/components/ui/button";
import { PostForm } from "./PostForm";
import { PostList } from "./PostList";
import { useState } from "react";
import { PageRequest, useGetPostsQuery } from "../api";
import { Loader } from "@/components/common/Loader";

export const FeedPage = () => {
  const [page, setPage] = useState<PageRequest>({ page: 0, size: 10 });
  const { data: posts, isLoading } = useGetPostsQuery(page);
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
      <div>
        <PostForm />
        <PostList posts={posts?.content} />
      </div>
    </div>
  );
};
