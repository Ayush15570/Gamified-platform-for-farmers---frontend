import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://gamified-platform-for-farmers-backend-1.onrender.com/api/v1",
  withCredentials: true, // important!
});

// Log request and response
axiosInstance.interceptors.request.use((config) => {
  console.log("Request config:", config);
  return config;
});

axiosInstance.interceptors.response.use((response) => {
  console.log("Response:", response);
  return response;
});

export default axiosInstance;
