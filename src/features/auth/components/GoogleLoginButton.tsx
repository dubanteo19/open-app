import { Loader } from "@/components/common/Loader";
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
            re.then(() => {
              navigate("/feed");
            });
          }
        }}
        onError={() => console.log("login failed")}
      />
    </div>
  );
};
