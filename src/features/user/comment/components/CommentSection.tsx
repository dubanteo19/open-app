import { Button } from "@/components/ui/button";
import { CommentList } from "../../feed/components/CommentList";
import { CommentForm } from "./CommentForm";
import { TypingIndicator } from "./TypingIndicator";
import { useAppSelector } from "@/hooks/useAppDispatch";
import { FC, useEffect, useState } from "react";
import { CommentResponse } from "../dto/comment";
import { useGetCommentsByPostIdQuery } from "../api";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  activateSocketClient,
  deactivateSocketClient,
  getSocketClient,
  subscribeWhenConnected,
} from "@/shared/websocket";
import { toast } from "sonner";
interface CommentSectionProps {
  postId: number;
  postAuthorName: string;
}
export const CommentSection: FC<CommentSectionProps> = ({
  postId,
  postAuthorName,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleComments, setVisibleComments] = useState<CommentResponse[]>([]);
  const { user } = useAppSelector((state) => state.auth);
  const updateVisibleComment = (newComment: CommentResponse) => {
    setVisibleComments((prev) => [newComment, ...prev]);
  };
  const {
    data: commentPage,
    isLoading: isLoadingComments,
    refetch: refetchComments,
  } = useGetCommentsByPostIdQuery(
    postId
      ? { postId: postId, page: { size: 5, page: currentPage } }
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
  useEffect(() => {
    const client = getSocketClient();
    if (!client) return;
    const topic = `/topic/posts/${postId}/comments`;
    const unsubscribe = subscribeWhenConnected(client, topic, (message) => {
      const payload = JSON.parse(message.body);
      if (payload.username != user?.username) {
        updateVisibleComment(payload.comment);
        toast.info("There is new comment");
      }
    });
    activateSocketClient();
    return () => {
      unsubscribe(), deactivateSocketClient();
    };
  }, [refetchComments, postId, user]);
  const handleShowMore = () => {
    setCurrentPage((prev) => prev + 1);
  };
  return (
    <div className="w-full">
      <CommentForm
        onSaveComment={updateVisibleComment}
        authorUsername={postAuthorName}
        postId={postId}
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
      <div className="flex-center mt-2">
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
