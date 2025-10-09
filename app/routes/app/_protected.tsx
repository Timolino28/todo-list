import { Outlet, Navigate } from "react-router";
import { useAuth } from "~/context/AuthContext";

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-gray-400 p-6">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />; // zeigt routes/app/index.tsx, wenn User eingeloggt ist
}
