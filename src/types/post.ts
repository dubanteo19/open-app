import { User } from "@/types/user";
export interface PostPayload {
  content: string;
}
export interface PostUpdateRequset {
  postId?: number;
  payload: PostPayload;
}
export interface PostCreateRequset {
  openerId?: number;
  payload: PostPayload;
}
export interface Post {
  id: number;
  author: User;
  sentiment: number;
  content: string;
  updatedAt?: string;
  likeCount?: number;
  viewCount?: number;
  commentCount?: number;
}
