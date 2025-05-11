import { uuid } from "@/lib/utils";
import { RootState } from "@/shared/store";
import { Post } from "@/types/post";
import { useSelector } from "react-redux";
import { PostItem } from "./PostItem";
interface PostListProps {
  posts?: Post[];
}
export const PostList: React.FC<PostListProps> = ({ posts }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="flex flex-col px-2 w-full">
      {posts &&
        posts.map((post) => (
          <PostItem
            {...post}
            isMine={user?.id == post.author.id}
            key={uuid()}
          />
        ))}
    </div>
  );
};
