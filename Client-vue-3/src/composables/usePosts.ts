import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import type { Post } from "../types/posts.ts";
import { postsApi } from "../api/postsApi.ts";

export const postsQueryKeys = {
  all: ["posts"] as const,
  lists: () => ["posts", "list"] as const,
  detail_slug: (slug: string) => ["posts", "detail", slug] as const,
};

export const usePosts = () => {
  return useQuery<Post[]>({
    queryKey: postsQueryKeys.lists(),
    queryFn: () => postsApi.getAll(),
  });
};

export const usePost = (slug: string) => {
  return useQuery({
    queryKey: postsQueryKeys.detail_slug(slug),
    queryFn: () => postsApi.getBySlug(slug),
  });
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: postsApi.create,
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: Partial<Post> }) =>
      postsApi.update(slug, data),
    onSuccess: (updatedPost) => {
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.lists() });
      queryClient.setQueryData(
        postsQueryKeys.detail_slug(updatedPost.slug),
        updatedPost,
      );
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => postsApi.delete(slug),
    onSuccess: (_, slug: string) => {
      queryClient.removeQueries({ queryKey: postsQueryKeys.detail_slug(slug) });
      queryClient.invalidateQueries({ queryKey: postsQueryKeys.lists() });
    },
    onMutate: async (slug) => {
      await queryClient.cancelQueries({ queryKey: postsQueryKeys.lists() });

      const previousPosts = queryClient.getQueryData<Post[]>(
        postsQueryKeys.lists(),
      );

      if (previousPosts) {
        queryClient.setQueryData(
          postsQueryKeys.lists(),
          previousPosts.filter((post) => post.slug !== slug),
        );
      }

      return { previousPosts };
    },
    onError: (err, slug, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(postsQueryKeys.lists(), context.previousPosts);
      }
    },
  });
};
