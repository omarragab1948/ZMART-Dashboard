import { useUserStore } from "@/stores/userStore";
import type { IUser } from "@/types/user";
import { deleteCookie, setCookie } from "@/utils/cookiesHandler";
import { useNavigate } from "react-router";

const AuthHandlers = () => {
  const navigate = useNavigate();
  const { user, login, logout } = useUserStore((state) => state);
  const loginHandler = (userData: IUser, token: string) => {
    login(userData);
    setCookie("user", userData);
    setCookie("accessToken", token);
    navigate("/dashboard");
  };
  const handleLogout = () => {
    logout();
    deleteCookie("user");
    deleteCookie("accessToken");
    navigate("/login");
  };
  return {
    user,
    loginHandler,
    handleLogout,
  };
};

export default AuthHandlers;
