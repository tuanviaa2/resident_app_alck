import axios from "axios";
import { localStorage } from "./storage";

const AxiosInstance = (contentType = "application/json") => {
  const axiosInstance = axios.create({
    baseURL: "https://datn-rlw1.onrender.com/",
    timeout: 10000
  });
  axiosInstance.interceptors.request.use(
    async (config: any) => {
      const token = localStorage.getString("token");
      config.headers = {
        "Authorization": `${token}`,
        "Accept": "application/json",
        "Content-Type": contentType
      };
      return config;
    },
    err => Promise.reject(err)
  );

  axiosInstance.interceptors.response.use(
    res => res.data,
    err => Promise.reject(err)
  );
  return axiosInstance;
};

export default AxiosInstance;
