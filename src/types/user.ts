export interface User {
  id: number;
  displayName: string;
  avatarUrl: string;
  username: string;
  verified?: boolean;
}
export interface OpenerDetail {
  summary: User;
  bio: string;
  location: string;
  joinDate: string;
  following: number;
  followers: number;
}
export interface OpenerUpdateRequest {
  openerId: number;
  displayName?: string;
  bio?: string;
  location?: string;
}
