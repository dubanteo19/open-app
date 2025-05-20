import { uuid } from "@/lib/utils";
import { Post } from "@/types/post";
import { PostItem } from "./PostItem";
import { useAppSelector } from "@/hooks/useAppDispatch";
interface PostListProps {
  posts?: Post[];
}
export const PostList: React.FC<PostListProps> = ({ posts }) => {
  const { user } = useAppSelector((state) => state.auth);
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
