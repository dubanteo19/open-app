import { Post } from "@/types/post";
import { PostItem } from "./PostItem";
interface PostListProps {
  posts: Post[];
  handleLikeToggle: (postId: number) => void;
  handleDelete: (postId: number) => void;
}
export const PostList: React.FC<PostListProps> = ({
  posts,
  handleLikeToggle,
  handleDelete,
}) => {
  return (
    <div>
      {posts.length > 0 && (
        <div className="flex flex-col w-full">
          {posts.map((post) => (
            <PostItem
              post={post}
              onToggleLike={handleLikeToggle}
              onDelete={handleDelete}
              key={post.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
