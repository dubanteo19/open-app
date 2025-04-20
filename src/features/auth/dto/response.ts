export interface UserResponse {
  id: number;
  username: string;
  avatarUrl: string;
  displayName: string;
}
export interface LoginResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}
