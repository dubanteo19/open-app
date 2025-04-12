import { Button } from "@/components/ui/button";
import { PostForm } from "./PostForm";
import { PostList } from "./PostList";

export const FeedPage = () => {
  return (
    <div className="flex flex-col ">
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
        <PostList />
      </div>
    </div>
  );
};
