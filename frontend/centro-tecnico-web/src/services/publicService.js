import apiClient from "./apiClient";

export async function getPublicCourses() {
    const response = await apiClient.get("/courses?onlyActive=true");
    return response.data;
}

export async function getPublicCategories(page = 1, pageSize = 50) {
    const response = await apiClient.get(`/categories?page=${page}&pageSize=${pageSize}`);
    return response.data;
}

export async function getPublicCategoryById(id) {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
}