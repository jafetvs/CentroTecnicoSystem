import apiClient from "./apiClient";

export async function getCategories(page = 1, pageSize = 20) {
    const response = await apiClient.get(`/categories?page=${page}&pageSize=${pageSize}`);
    return response.data;
}

export async function getCategoryById(id) {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
}

export async function createCategory(formData) {
    const response = await apiClient.post("/categories", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export async function updateCategory(id, formData) {
    const response = await apiClient.put(`/categories/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export async function deleteCategory(id) {
    const response = await apiClient.delete(`/categories/${id}`);
    return response.data;
}

export async function uploadCategoryPhotos(id, formData) {
    const response = await apiClient.post(`/categories/${id}/photos`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export async function deleteCategoryPhoto(photoId) {
    const response = await apiClient.delete(`/categories/photos/${photoId}`);
    return response.data;
}