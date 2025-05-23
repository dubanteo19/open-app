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
  liked: boolean | false;
  mine: boolean | false;
  likeCount: number | 0;
  viewCount: number | 0;
  commentCount: number | 0;
}
