import axios from "axios";

const Api = axios.create({
  baseURL: "https://api.qarshimall.uz/api",
  // baseURL: "http://localhost:8086/api",

  headers: {
    "Content-Type": "application/json",
    // "Access-Control-Allow-Origin": "http://localhost:5173",
    // "Access-Control-Allow-Origin": "*",
  },
});

Api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Replace with your own way of retrieving the JWT token

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

Api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403) {
      console.log(error);
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default Api;
