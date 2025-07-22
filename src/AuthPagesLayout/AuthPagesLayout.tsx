import AuthHandlers from "@/features/auth/AuthHandlers";
import { Navigate, Outlet } from "react-router";

const AuthPagesLayout = () => {
  const { user } = AuthHandlers();
  if (user?.id) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className="flex items-center justify-center h-screen">
      <Outlet />
    </div>
  );
};

export default AuthPagesLayout;
