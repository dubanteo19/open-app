import { Loader } from "@/components/common/Loader";
import { toastError } from "@/features/user/feed/util";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { useGoogleLoginMutation } from "../api";

export const GoogleLoginButton = () => {
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
            re.catch((error) => toastError(error));
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
