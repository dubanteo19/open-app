import { Loader } from "@/components/common/Loader";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { StompSubscription } from "@stomp/stompjs";
import { toast } from "sonner";
export const PostDetailPage = () => {
  const { postId } = useParams();
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const { data: post, isLoading } = useGetPostByIdQuery(Number(postId));
  const {
    data: commentPage,
    isLoading: isLoadingComments,
    refetch: refetchComments,
  } = useGetCommentsByPostIdQuery(
    post?.id
      ? { postId: post?.id, page: { size: pageSize, page: currentPage } }
      : skipToken,
  );
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    const client = getSocketClient();
    if (!client) return;
    const topic = `/topic/posts/${postId}/comments`;
    const unsubscribe = subscribeWhenConnected(client, topic, (message) => {
      console.log("subscribe", topic);
      const payload = JSON.parse(message.body);
      if (payload.username != user?.username) {
        refetchComments();
        toast.info("There is new comment");
      }
    });
    activateSocketClient();
    return () => {
      unsubscribe(), deactivateSocketClient();
    };
  }, [refetchComments, postId, user]);
  if (isLoading) return <Loader />;
  return (
    <div className="flex flex-col space-y-2 ">
      {post && <PostItem isMine={post.author.id == user?.id} {...post} />}
      <CommentForm authorUsername={post?.author.username} postId={post?.id} />
      <TypingIndicator
        postId={Number(postId)}
        currentUsername={user?.username}
      />
      <div>
        <h3>Comments</h3>
      </div>
      {commentPage ? (
        <CommentList
          isLoading={isLoadingComments}
          comments={commentPage.content}
        />
      ) : (
        <div>No Comment found</div>
      )}
      {commentPage && commentPage.totalPages > 1 && (
        <div>
          <Pagination>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
              />
            </PaginationItem>
            <PaginationContent>
              {Array.from({ length: commentPage.totalPages }).map(
                (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      isActive={index == currentPage}
                      onClick={() => {
                        setCurrentPage(index);
                      }}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};
