import axios from "axios";

const api = axios.create({
    baseURL: "http://www.apimanstyle.somee.com/api", // Usa HTTP (Somee Free no incluye HTTPS)
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;