import apiClient from "./apiClient";

export async function getCourses(onlyActive = false) {
    const response = await apiClient.get(`/courses?onlyActive=${onlyActive}`);
    return response.data;
}

export async function getCourseById(id) {
    const response = await apiClient.get(`/courses/${id}`);
    return response.data;
}

export async function createCourse(data) {
    const response = await apiClient.post("/courses", data);
    return response.data;
}

export async function updateCourse(id, data) {
    const response = await apiClient.put(`/courses/${id}`, data);
    return response.data;
}

export async function deleteCourse(id) {
    const response = await apiClient.delete(`/courses/${id}`);
    return response.data;
}