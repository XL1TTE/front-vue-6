import type { Post } from "../types/posts.ts";

const API_BASE_URL = "http://127.0.0.1:8000";

const fetchConfig: RequestInit = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.message || `HTTP error! status: ${response.status}`,
    );
  }
  return response.json();
};

export const postsApi = {
  async getAll(): Promise<Post[]> {
    const response = await fetch(`${API_BASE_URL}/posts`, fetchConfig);

    return handleResponse(response);
  },

  async getBySlug(slug: string): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts/${slug}`, fetchConfig);
    return await handleResponse(response);
  },

  async create(post: Post): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      ...fetchConfig,
      method: "POST",
      body: JSON.stringify(post),
    });
    return await handleResponse(response);
  },

  async update(slug: string, post: Partial<Post>): Promise<Post> {
    const response = await fetch(`${API_BASE_URL}/posts/${slug}`, {
      ...fetchConfig,
      method: "PUT",
      body: JSON.stringify(post),
    });
    return await handleResponse(response);
  },

  async delete(slug: string): Promise<{ success: boolean }> {
    const response = await fetch(`${API_BASE_URL}/posts/${slug}`, {
      ...fetchConfig,
      method: "DELETE",
    });
    return handleResponse<{ success: boolean }>(response);
  },
};
