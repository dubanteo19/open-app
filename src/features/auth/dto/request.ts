export interface GoogleLoginRequest {
  idToken: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface RegisterRequest {
  email: string;
  displayName: string;
  username: string;
  password: string;
}
