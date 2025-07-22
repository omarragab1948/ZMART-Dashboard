import axios from "axios";
import Cookies from "js-cookie";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


api.interceptors.request.use(
    (config)=>{
        const accessToken = Cookies.get("accessToken");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }
)

export default api;