import { Outlet, Navigate } from "react-router";
import { useAuth } from "~/context/AuthContext";
import { Spinner } from "~/components/ui/spinner";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div>
        <Spinner className="text-gray-300 mx-auto size-8 mt-30" />
      </div>
    );
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />; // zeigt routes/app/index.tsx, wenn User eingeloggt ist
}
