export interface User {
  id: number;
  displayName: string;
  avatarUrl: string;
  username: string;
  verified?: boolean;
}
export interface SuggestedOpener extends User {
  bio: string;
  followed: boolean;
  me?: boolean;
}

export interface OpenerDetail {
  summary: User;
  bio: string;
  location: string;
  joinDate: string;
  following: number;
  followers: number;
  followed: boolean;
}
export interface OpenerUpdateAvatarRequest {
  openerId: number;
  avatarUrl: string;
}
export interface OpenerUpdateRequest {
  displayName?: string;
  bio?: string;
  location?: string;
}
