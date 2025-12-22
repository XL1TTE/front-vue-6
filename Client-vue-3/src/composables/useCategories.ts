import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { Category } from "../types/category.ts";
import { categoriesApi } from "../api/categoriesApi.ts";

export const categoryQueryKeys = {
  all: ["categories"] as const,
  lists: () => ["categories", "list"] as const,
  detail_id: (id: number) => ["categories", "detail", id] as const,
};

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: categoryQueryKeys.lists(),
    queryFn: () => categoriesApi.getAll(),
  });
};

export const useCategory = (id: number) => {
  return useQuery({
    queryKey: categoryQueryKeys.detail_id(id),
    queryFn: () => categoriesApi.getById(id),
  });
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: categoriesApi.create,
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Category> }) =>
      categoriesApi.update(id, data),
    onSuccess: (updatedCategory) => {
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
      queryClient.setQueryData(
        categoryQueryKeys.detail_id(updatedCategory.id),
        updatedCategory,
      );
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => categoriesApi.delete(id),
    onSuccess: (_, id: number) => {
      queryClient.removeQueries({ queryKey: categoryQueryKeys.detail_id(id) });
      queryClient.invalidateQueries({ queryKey: categoryQueryKeys.lists() });
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: categoryQueryKeys.lists() });

      const previousCategories = queryClient.getQueryData<Category[]>(
        categoryQueryKeys.lists(),
      );

      if (previousCategories) {
        queryClient.setQueryData(
          categoryQueryKeys.lists(),
          previousCategories.filter((category) => category.id !== id),
        );
      }

      return { previousCategories };
    },
    onError: (err, id, context) => {
      if (context?.previousCategories) {
        queryClient.setQueryData(
          categoryQueryKeys.lists(),
          context.previousCategories,
        );
      }
    },
  });
};
