import { login, loginWithGoogle } from "@/redux/actions/auth";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { Icons } from "./Icons";

const GoogleButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading } = useSelector((state) => state.auth);

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      dispatch(loginWithGoogle(navigate, tokenResponse.access_token)),
  });
  return (
    <Button
      variant="outline"
      type="button"
      disabled={isLoading}
      onClick={() => googleLogin()}
    >
      {isLoading ? (
        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.google className="mr-2 h-4 w-4" />
      )}{" "}
      Google
    </Button>
  );
};

export default GoogleButton;
