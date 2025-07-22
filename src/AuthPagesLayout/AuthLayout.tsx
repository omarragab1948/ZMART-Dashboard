import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import AuthHandlers from "@/features/auth/AuthHandlers";
import { Navigate, Outlet } from "react-router";

const AuthLayout = () => {
  const { user } = AuthHandlers();
  if (!user?.id) {
    return <Navigate to="/" />;
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <Outlet />
      </main>
    </SidebarProvider>
  );
};

export default AuthLayout;
