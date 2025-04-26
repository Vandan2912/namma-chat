import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.example.com", // your real backend URL
  withCredentials: true, // important to send cookies
});

// Optional: Add interceptors for automatic error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);
// Optional: Add interceptors for adding auth token if needed
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
// Optional: Add interceptors for refreshing token if needed
// axiosInstance.interceptors.response.use(
//   (response) => {
//     if (response.status === 401) {
//       // Handle token refresh logic here
//       // For example, you can call a refresh token endpoint and update the token in localStorage
//     }
//     return response;
//   }
// );
