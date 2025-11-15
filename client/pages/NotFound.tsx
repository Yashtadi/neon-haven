import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
      <div className="text-center max-w-md">
        <div className="text-8xl mb-6">🌿</div>
        <h1 className="text-5xl font-bold text-foreground mb-3">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Oops! This page doesn't exist
        </p>
        <p className="text-muted-foreground mb-8">
          The page you're looking for has gone to the great green beyond. Let's
          get you back on track!
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition font-semibold"
          >
            Back to Home
          </Link>
          <Link
            to="/shop"
            className="border border-border text-foreground px-6 py-3 rounded-lg hover:bg-muted transition font-semibold"
          >
            Shop Plants
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
