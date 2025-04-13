export interface User {
  id: number;
  displayName: string;
  avatar: string;
  userName: string;
  verified?: boolean;
}
export interface UserDetail extends User {
  bio: string;
  location: string;
  joinDate: string;
  following: number;
  followers: number;
}
