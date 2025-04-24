import { UserResponse } from "@/features/auth/dto/response";

export interface CommentPayload {
  content: string;
}
export interface CommentCreateRequest {
  payload: CommentPayload;
  authorId?: number;
  postId?: number;
}
export interface CommentUpdateRequest {
  payload: CommentPayload;
  commentId: number;
}

export interface CommentResponse {
  id: number;
  content: string;
  author: UserResponse;
  updatedAt: string;
}
