export interface User {
  id: number;
  displayName: string;
  avatar: string;
  username: string;
  verified?: boolean;
}
export interface UserDetail extends User {
  bio: string;
  location: string;
  joinDate: string;
  following: number;
  followers: number;
}
