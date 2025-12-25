import axios from "axios";
import type { Post } from "../types/posts.ts";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const handleError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const serverDetail = error.response?.data?.detail;
    const message = serverDetail || error.message;
    throw new Error(`API Error: ${message}`);
  }
  throw error;
};

export const postsApi = {
  async getAll(search?: string): Promise<Post[]> {
    try {
      const response = await api.get<Post[]>("/posts", {
        params: search?.trim() ? { search: search.trim() } : {},
      });
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async getBySlug(slug: string): Promise<Post> {
    try {
      const response = await api.get<Post>(`/posts/${slug}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async create(post: Omit<Post, "id" | "slug">): Promise<Post> {
    try {
      const response = await api.post<Post>("/posts", post);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async update(slug: string, post: Partial<Post>): Promise<Post> {
    try {
      const response = await api.put<Post>(`/posts/${slug}`, post);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  async delete(slug: string): Promise<{ message: string }> {
    try {
      const response = await api.delete<{ message: string }>(`/posts/${slug}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};
