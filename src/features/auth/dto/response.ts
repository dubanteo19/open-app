export interface UserResponse {
  id: number;
  username: string;
  displayName: string;
}
export interface LoginResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}
