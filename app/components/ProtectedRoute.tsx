import { Navigate, Outlet, replace } from "react-router";
import { useAuth } from "~/context/AuthContext";
import { Spinner } from "./ui/spinner";

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div>
        <Spinner className="size-8 text-gray-300" />
      </div>
    );
  }

  //Kein User? -> Redirect zum Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //Wenn User da ist -> App rendern
  return <Outlet />;
}

export default ProtectedRoute;
