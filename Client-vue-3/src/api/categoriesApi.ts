import type {Category} from "../types/category.ts";
import type {ApiResponse} from "../types/api.ts";

const API_BASE_URL = 'http://127.0.0.1:8000'

const fetchConfig: RequestInit = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
}

const handleResponse = async <T>(response: Response): Promise<T> => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(
            errorData.message || `HTTP error! status: ${response.status}`
        )
    }
    return response.json()
}

export const categoriesApi = {
    async getAll(): Promise<Category[]> {
        const response = await fetch(`${API_BASE_URL}/categories`, fetchConfig)

         return handleResponse(response);
    },
    
    async getById(id: number): Promise<Category> {
        const response = await fetch(`${API_BASE_URL}/categories/${id}`, fetchConfig)
        const data: ApiResponse<Category> = await handleResponse(response)
        return data.data
    },

    async create(category: Category): Promise<Category> {
        const response = await fetch(`${API_BASE_URL}/categories`, {
            ...fetchConfig,
            method: 'POST',
            body: JSON.stringify(category),
        })
        const data: ApiResponse<Category> = await handleResponse(response)
        return data.data
    },

    async update(slug: string, category: Partial<Category>): Promise<Category> {
        const response = await fetch(`${API_BASE_URL}/categories/${slug}`, {
            ...fetchConfig,
            method: 'PUT',
            body: JSON.stringify(category),
        })
        const data: ApiResponse<Category> = await handleResponse(response)
        return data.data
    },

    async delete(id: number): Promise<{ success: boolean }> {
        const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
            ...fetchConfig,
            method: 'DELETE',
        })
        return handleResponse<{ success: boolean }>(response)
    },
}