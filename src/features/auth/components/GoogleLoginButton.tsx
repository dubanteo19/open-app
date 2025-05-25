import { Loader } from "@/components/common/Loader";
import { GoogleLogin } from "@react-oauth/google";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLoginMutation } from "../api";

interface GoogleLoginButtonProps {
  callback: (error: unknown) => void;
}
export const GoogleLoginButton: FC<GoogleLoginButtonProps> = ({ callback }) => {
  const [gooleLogin, { isLoading }] = useGoogleLoginMutation();
  const navigate = useNavigate();
  return (
    <div>
      {isLoading && <Loader />}
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential) {
            const re = gooleLogin({
              idToken: credentialResponse.credential,
            }).unwrap();
            re.catch((error) => {
              callback(error);
            });
            re.then(() => {
              navigate("/feed");
            });
          }
        }}
        onError={() => console.log("login failed")}
        auto_select
      />
    </div>
  );
};
