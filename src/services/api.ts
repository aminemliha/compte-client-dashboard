import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getServiceOptions = async () => {
  try {
    const response = await api.get("/service-options");
    return response.data;
  } catch (error) {
    console.error("Error fetching service options:", error);
    throw error;
  }
};

export default api;
