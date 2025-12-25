<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { usePost } from "../composables/usePosts.ts";
import { useToaster } from "../composables/useToaster.ts";
import PostForm from "../components/forms/PostForm.vue";
import type { Post } from "../types/posts.ts";

const route = useRoute();
const router = useRouter();
const slug = route.params.slug as string;

const { data: post, isLoading } = usePost(slug);

const { success: notifySuccess, error: notifyError } = useToaster(
  3000,
  "top-right",
);

const handleSuccess = (post: Post) => {
  notifySuccess(`Post was successfully updated`);
  router.push({ name: "post-details", params: { slug: post.slug } });
};
const handleCancel = (post: Post) => {
  router.push({ name: "post-details", params: { slug: post.slug } });
};

const handleError = (error: any) => {
  notifyError(`Failed to update post:": ${error || "Unknown error"}`);
};
</script>
<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Редактировать пост</h1>
        <p class="mt-2 text-gray-600">Внесите изменения в пост</p>
      </div>

      <div v-if="isLoading" class="text-center py-8">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
        ></div>
      </div>

      <div v-else-if="post" class="bg-white rounded-lg shadow p-6">
        <PostForm
          :post="post"
          mode="edit"
          @cancel="handleCancel"
          @error="handleError"
          @success="handleSuccess"
        />
      </div>

      <div v-else class="text-center py-8 text-red-600">Пост не найден</div>
    </div>
  </div>
</template>
