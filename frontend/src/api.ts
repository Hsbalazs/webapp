import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true // fontos! cookie miatt
});

// Access token hozzáadása
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh interceptor
let isRefreshing = false;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Ha 401 és még nem próbáltunk refresh-t
    if (error.response?.status === 401 && !isRefreshing) {
      isRefreshing = true;

      try {
        const refreshResponse = await axios.post(
          "http://localhost:8080/auth/refresh",
          {},
          { withCredentials: true }
        );

        const newAccessToken = refreshResponse.data;

        localStorage.setItem("token", newAccessToken);

        // új token hozzáadása
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        isRefreshing = false;

        return api(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
