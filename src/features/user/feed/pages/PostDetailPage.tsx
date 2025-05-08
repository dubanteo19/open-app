import { Loader } from "@/components/common/Loader";
import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCommentsByPostIdQuery } from "../../comment/api";
import { TypingIndicator } from "../../comment/components/TypingIndicator";
import { useGetPostByIdQuery } from "../api";
import { CommentList } from "../components/CommentList";
import { PostItem } from "./PostList";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/store";
import { CommentForm } from "../../comment/components/CommentForm";
import {
  activateSocketClient,
  deactivateSocketClient,
  getSocketClient,
  subscribeWhenConnected,
} from "@/shared/websocket";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CommentResponse } from "../../comment/dto/comment";
export const PostDetailPage = () => {
  const { postId } = useParams();
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const { data: post, isLoading } = useGetPostByIdQuery(Number(postId));
  const [visibleComments, setVisibleComments] = useState<CommentResponse[]>([]);
  const {
    data: commentPage,
    isLoading: isLoadingComments,
    refetch: refetchComments,
  } = useGetCommentsByPostIdQuery(
    post?.id
      ? { postId: post?.id, page: { size: pageSize, page: currentPage } }
      : skipToken,
  );
  useEffect(() => {
    if (commentPage?.content) {
      setVisibleComments((prev) => {
        const existingIds = new Set(prev.map((c) => c.id));
        const newComments = commentPage.content.filter(
          (c) => !existingIds.has(c.id),
        );
        return [...prev, ...newComments];
      });
    }
  }, [commentPage]);
  const { user } = useSelector((state: RootState) => state.auth);
  const updateVisibleComment = (newComment: CommentResponse) => {
    setVisibleComments((prev) => [newComment, ...prev]);
  };
  useEffect(() => {
    const client = getSocketClient();
    if (!client) return;
    const topic = `/topic/posts/${postId}/comments`;
    const unsubscribe = subscribeWhenConnected(client, topic, (message) => {
      console.log("subscribe", topic);
      const payload = JSON.parse(message.body);
      if (payload.username != user?.username) {
        console.log(payload);
        updateVisibleComment(payload.comment);
        toast.info("There is new comment");
      }
    });
    activateSocketClient();
    return () => {
      unsubscribe(), deactivateSocketClient();
    };
  }, [refetchComments, postId, user]);
  if (isLoading) return <Loader />;
  const handleShowMore = () => {
    setCurrentPage((prev) => prev + 1);
  };
  return (
    <div className="flex flex-col space-y-2  mb-20">
      {post && <PostItem isMine={post.author.id == user?.id} {...post} />}
      <CommentForm
        onSaveComment={updateVisibleComment}
        authorUsername={post?.author.username}
        postId={post?.id}
      />
      <TypingIndicator
        postId={Number(postId)}
        currentUsername={user?.username}
      />
      <div className="px-3">
        <h3>Comments</h3>
      </div>
      {commentPage ? (
        <CommentList isLoading={isLoadingComments} comments={visibleComments} />
      ) : (
        <div>No Comment found</div>
      )}
      <div className="mx-auto">
        <Button
          onClick={handleShowMore}
          disabled={commentPage?.isLast || isLoadingComments}
        >
          Show more
        </Button>
      </div>
    </div>
  );
};
