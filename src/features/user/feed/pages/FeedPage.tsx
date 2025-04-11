import { Button } from "@/components/ui/button";
import { PostForm } from "./PostForm";

export const FeedPage = () => {
  return (
    <div className="flex flex-col">
      <div className=" w-full grid grid-cols-2  ">
        <div className="flex-center">
          <Button
            variant="ghost"
            className="font-bold border-b-3 border-b-primary rounded-none"
          >
            For you
          </Button>
        </div>
        <div className="flex-center">
          <Button variant="ghost">Following</Button>
        </div>
      </div>
      <PostForm />
    </div>
  );
};
