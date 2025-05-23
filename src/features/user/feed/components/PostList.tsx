import { uuid } from "@/lib/utils";
import { Post } from "@/types/post";
import { PostItem } from "./PostItem";
interface PostListProps {
  posts?: Post[];
}
export const PostList: React.FC<PostListProps> = ({ posts }) => {
  return (
    <div className="flex flex-col px-2 w-full">
      {posts && posts.map((post) => <PostItem {...post} key={uuid()} />)}
    </div>
  );
};
