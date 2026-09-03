import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL
});

api.interceptors.request.use((config) => {
    const localStorage = window.localStorage;
    const token = localStorage.getItem("@ParkTech:token");

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
});