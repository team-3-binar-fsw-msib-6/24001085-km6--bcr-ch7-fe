import LoginForm from "@/components/LoginForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <div className="container relative h-svh flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <Link
          to="/register"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "absolute right-4 top-4 md:right-8 md:top-8"
          )}
        >
          Register
        </Link>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
          <div className="absolute inset-0 bg-zinc-900 bg-[url(bg.jpg)] grayscale opacity-20 bg-cover" />
          <div className="relative z-20 flex items-center text-lg font-medium">
            Kampus Merdeka - Election
          </div>
          <div className="relative z-20 mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Jadikan Pemilu 2024 menjadi Pemilu yang damai,
                bermartabat dan berintegritas dengan cara memerangi
                hoaks.&rdquo;
              </p>
              <footer className="text-sm">Pemilu 2024</footer>
            </blockquote>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Sign in to your account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to sign in to your account
              </p>
            </div>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
