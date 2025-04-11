import { User } from "@/types/user";

export interface Post {
  id: number;
  author: User;
  dateTime?: string;
  content: string;
  likes?: number;
  views?: number;
  comments?: number;
}
