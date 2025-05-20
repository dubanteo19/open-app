export enum ErrorCode {
  POST_SPAM_DETECTED = "POST_SPAM_DETECTED",
  POST_CONTENT_SPAM_DETECTED = "POST_CONTENT_SPAM_DETECTED",
  POST_NOT_FOUND = "POST_NOT_FOUND",
  REQUEST_SPAM_DETECTED = "REQUEST_SPAM_DETECTED",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
  BAD_CREDENTIAL = "BAD_CREDENTIAL",
  OPENER_BLOCKED = "OPENER_BLOCKED",
  EMAIL_EXISTS = "EMAIL_EXISTS",
  USERNAME_EXISTS = "USERNAME_EXISTS",
}
export const errorMessage: Record<ErrorCode, string> = {
  POST_NOT_FOUND: "Post not found",
  POST_SPAM_DETECTED:
    "Your content is duplicated!\n If you continue spaming your account would be blocked",
  REQUEST_SPAM_DETECTED:
    "You created too many post in a minute\n If you continue spaming your account would be blocked",
  POST_CONTENT_SPAM_DETECTED:
    "Your post contains spam content \n If you continue spaming your account would be blocked ",
  USERNAME_EXISTS: "Username exists",
  EMAIL_EXISTS: "Email exists",
  BAD_CREDENTIAL: "Email or password is incorrect",
  OPENER_BLOCKED: "Account has been blocked",
  UNKNOWN_ERROR: "Unknown errror",
};
