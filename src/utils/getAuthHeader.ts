import Cookies from "js-cookie";
const getAuthHeader = () => {
  const token = Cookies.get("accessToken");
  return token ? { Aurhorization: `Bearer ${token}` } : {};
};

export default getAuthHeader;
