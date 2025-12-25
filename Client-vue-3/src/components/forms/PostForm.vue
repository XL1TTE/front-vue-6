<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import useVuelidate from "@vuelidate/core";
import { integer, minLength, required } from "@vuelidate/validators";
import type { Post } from "../../types/posts.ts";
import { useCategories } from "../../composables/useCategories.ts";
import { useCreatePost, useUpdatePost } from "../../composables/usePosts.ts";

interface Props {
  post?: Post;
  mode?: "create" | "edit";
}
interface Emits {
  success: [post: Post];
  cancel: [];
  error: [error: any];
}

const { post = null, mode = "create" } = defineProps<Props>();
const form = ref(post ?? ({} as Post));
const emits = defineEmits<Emits>();

const { data: categories = [] } = useCategories();

const urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&\/=]*)/;
const rules = {
  name: { required, minLength: minLength(3) },
  content: { required, minLength: minLength(10) },
  image_url: { url: (value: string) => !value || urlRegex.test(value) },
  category_id: { required, integer },
};

const v$ = useVuelidate(rules, form);

const { isPending: isCreatingPost, mutateAsync: createPostMutation } =
  useCreatePost();
const { isPending: isUpdatingPost, mutateAsync: updatePostMutation } =
  useUpdatePost();

const submitButtonText = computed(() => {
  return mode === "create" ? "Создать пост" : "Сохранить изменения";
});

const previewImageUrl = computed(() => {
  return form.value.image_url || null;
});

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    return;
  }

  if (mode === "create") {
    await createPostMutation(form.value, {
      onSuccess: (post: Post) => {
        emits("success", post);
      },
      onError: (error: Error) => {
        emits("error", error.message);
      },
    });
  } else {
    await updatePostMutation(
      {
        slug: post!.slug,
        data: form.value,
      },
      {
        onSuccess: (post: Post) => {
          emits("success", post);
        },
        onError: (error: any) => {
          emits("error", error);
        },
      },
    );
  }
};

watch(
  () => post,
  (newPost) => {
    if (newPost) {
      form.value = {
        name: newPost.name,
        content: newPost.content,
        image_url: newPost.image_url,
        category_id: newPost.category_id,
      } as Post;
    }
  },
  { immediate: true },
);
</script>

<template>
  <form class="space-y-6 max-w-2xl mx-auto p-6" @submit.prevent="handleSubmit">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1" for="name">
        Название поста *
      </label>
      <input
        id="name"
        v-model="form.name"
        :class="[
          'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition',
          v$.name.$error ? 'border-red-500' : 'border-gray-300',
        ]"
        placeholder="Введите название поста"
        type="text"
      />
      <div v-if="v$.name.$error" class="mt-1 text-sm text-red-600">
        <p v-for="error in v$.name.$errors" :key="error.$uid">
          {{ error.$message }}
        </p>
      </div>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1" for="content">
        Содержание *
      </label>
      <textarea
        id="content"
        v-model="form.content"
        :class="[
          'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition',
          v$.content.$error ? 'border-red-500' : 'border-gray-300',
        ]"
        placeholder="Напишите содержание поста..."
        rows="6"
      ></textarea>
      <div v-if="v$.content.$error" class="mt-1 text-sm text-red-600">
        <p v-for="error in v$.content.$errors" :key="error.$uid">
          {{ error.$message }}
        </p>
      </div>
    </div>

    <div>
      <label
        class="block text-sm font-medium text-gray-700 mb-1"
        for="image_url"
      >
        Ссылка на изображение
      </label>
      <input
        id="image_url"
        v-model="form.image_url"
        class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        placeholder="https://example.com/image.jpg"
        type="url"
      />
      <div v-if="previewImageUrl" class="mt-3">
        <p class="text-sm text-gray-600 mb-2">Предпросмотр:</p>
        <img
          :src="previewImageUrl"
          alt="Preview"
          class="max-w-xs rounded-md shadow"
          crossorigin="anonymous"
        />
      </div>
    </div>

    <div>
      <label
        class="block text-sm font-medium text-gray-700 mb-1"
        for="category_id"
      >
        Категория *
      </label>
      <select
        id="category_id"
        v-model.number="form.category_id"
        :class="[
          'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition',
          v$.category_id.$error ? 'border-red-500' : 'border-gray-300',
        ]"
      >
        <option disabled value="">Выберите категорию</option>
        <option
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
        >
          {{ category.name }}
        </option>
      </select>
      <div v-if="v$.category_id.$error" class="mt-1 text-sm text-red-600">
        <p v-for="error in v$.category_id.$errors" :key="error.$uid">
          {{ error.$message }}
        </p>
      </div>
    </div>

    <div class="flex justify-end space-x-4 pt-4 border-t">
      <button
        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
        type="button"
        @click="emits('cancel')"
      >
        Отмена
      </button>
      <button
        :class="[
          'px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition',
          isCreatingPost || isUpdatingPost
            ? 'opacity-50 cursor-not-allowed'
            : '',
        ]"
        :disabled="isCreatingPost || isUpdatingPost"
        type="submit"
      >
        <span v-if="isCreatingPost || isUpdatingPost">Сохранение...</span>
        <span v-else>{{ submitButtonText }}</span>
      </button>
    </div>
  </form>
</template>
