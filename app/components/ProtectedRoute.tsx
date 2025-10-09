import { Navigate, Outlet, replace } from "react-router";
import { useAuth } from "~/context/AuthContext";

function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-gray-400 p-6">Loading...</div>;
  }

  //Kein User? -> Redirect zum Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  //Wenn User da ist -> App rendern
  return <Outlet />;
}

export default ProtectedRoute;
