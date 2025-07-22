import type { RootState } from "@/rtk/store";
import { login, logout } from "@/rtk/userSlice";
import type { IUser } from "@/types/user";
import { deleteCookie, setCookie } from "@/utils/cookiesHandler";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

const AuthHandlers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  console.log(user);
  const loginHandler = (userData: IUser, token: string) => {
    dispatch(login(userData));
    setCookie("user", userData);
    setCookie("accessToken", token);
    navigate("/dashboard");
  };
  const handleLogout = () => {
    dispatch(logout());
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
