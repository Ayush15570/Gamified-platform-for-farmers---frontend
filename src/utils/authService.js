import axiosInstance from "./axiosInstance";

const authService = {
  async getCurrentUser() {
    try {
      console.log("Fetching current user...");
      const res = await axiosInstance.get("/users/get-user");
      console.log("Response from /get-user:", res);
      return res.data.data;
    } catch (error) {
      console.error("Error fetching user, trying refresh token...", error);

      try {
        console.log("Trying refresh token...");
        await axiosInstance.post("/users/refresh-token"); // make sure this route also uses withCredentials: true
        const res = await axiosInstance.get("/users/get-user");
        console.log("Response after refresh token:", res);
        return res.data.data;
      } catch (err) {
        console.error("Refresh token failed:", err);
        return null;
      }
    }
  },
};

export default authService;
