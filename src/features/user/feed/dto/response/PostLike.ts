import { User } from "@/types/user";

export interface PostLike {
  likedBy: User;
  likedAt: string;
}
