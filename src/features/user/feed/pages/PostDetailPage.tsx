import { Loader } from "@/components/common/Loader";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CommentSection } from "../../comment/components/CommentSection";
import {
  useGetPostByIdQuery,
  useLikePostMutation,
  useUnlikePostMutation,
  useViewPostMutation,
} from "../api";
import { PostItem } from "../components/PostItem";
export const PostDetailPage = () => {
  const { postId } = useParams();
  const { data: post, isLoading } = useGetPostByIdQuery(Number(postId));
  const [viewPost] = useViewPostMutation();
  useEffect(() => {
    const triggerViewPost = async () => {
      await viewPost(Number(postId));
    };
    triggerViewPost();
  }, [viewPost, postId]);
  const [likePost] = useLikePostMutation();
  const [unlikePost] = useUnlikePostMutation();
  const handleLikeToggle = async (postId: number) => {
    const liked = post?.liked;
    const triggerUpdateLike = liked ? unlikePost : likePost;
    try {
      triggerUpdateLike(postId).unwrap();
      console.log("triger like");
    } catch (error) {
      console.log(error);
    }
  };
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col space-y-2  mb-20">
      {post && <PostItem onToggleLike={handleLikeToggle} post={post} />}
      {post && (
        <CommentSection
          postAuthorName={post.author.username}
          postId={post.id}
        />
      )}
    </div>
  );
};
