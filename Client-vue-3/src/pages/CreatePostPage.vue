<script lang="ts" setup>
import { useRouter } from "vue-router";
import PostForm from "../components/forms/PostForm.vue";
import { useToaster } from "../composables/useToaster.ts";
import type { Post } from "../types/posts.ts";

const router = useRouter();

const { success: notifySuccess, error: notifyError } = useToaster(
  3000,
  "top-right",
);

const handleSuccess = (post: Post) => {
  notifySuccess(`Post was successfully created`);
  router.push({ name: "post-details", params: { slug: post.slug } });
};

const handleError = (error: any) => {
  notifyError(`Failed to create post:": ${error || "Unknown error"}`);
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Создать новый пост</h1>
        <p class="mt-2 text-gray-600">
          Заполните форму ниже для создания нового поста
        </p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <PostForm
          mode="create"
          @cancel="router.push({ name: 'posts' })"
          @error="handleError"
          @success="handleSuccess"
        />
      </div>
    </div>
  </div>
</template>
