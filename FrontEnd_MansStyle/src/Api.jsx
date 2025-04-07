import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:44381/api", // Base URL con HTTPS
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;