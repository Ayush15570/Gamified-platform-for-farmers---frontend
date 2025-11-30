import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
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
