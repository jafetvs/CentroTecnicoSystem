import axios from "axios";

const API_URL = "https://centrotecnico-api-backend.onrender.com/api/auth";

export async function loginAdmin(data) {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
}