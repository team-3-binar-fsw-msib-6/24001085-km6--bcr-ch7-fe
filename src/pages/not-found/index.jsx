import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center space-y-4 h-screen">
      <div className="text-9xl font-bold">OOPS!</div>
      <p className="text-muted-foreground">
        404 | The page you searched is not found.
      </p>
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <a className="text-muted-foreground">Go back</a>
      </Button>
    </div>
  );
};

export default NotFoundPage;
