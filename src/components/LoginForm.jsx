import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { login, loginWithGoogle } from "@/redux/actions/auth";
import { Icons } from "./Icons";
import { useGoogleLogin } from "@react-oauth/google";
import GoogleButton from "./GoogleButton";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) =>
      dispatch(loginWithGoogle(navigate, tokenResponse.access_token)),
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    dispatch(login(navigate, email, password));
  };

  return (
    <div className={cn("grid gap-6")}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="password"
              placeholder="password"
              type="password"
              autoCapitalize="none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLoading ? "Loading.." : "Sign In"}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <GoogleButton />
    </div>
  );
};

export default LoginForm;
