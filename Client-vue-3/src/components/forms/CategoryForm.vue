<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import useVuelidate from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import type { Category } from "../../types/category.ts";
import {
  useCreateCategory,
  useUpdateCategory,
} from "../../composables/useCategories.ts";

interface Props {
  category?: Category;
  mode?: "create" | "edit";
}
interface Emits {
  success: [];
  cancel: [];
  error: [error: any];
}

const { category = null, mode = "create" } = defineProps<Props>();
const form = ref(category ?? ({} as Category));
const emits = defineEmits<Emits>();

const rules = {
  name: { required, minLength: minLength(2) },
};

const v$ = useVuelidate(rules, form);

const { isPending: isCreatingCategory, mutateAsync: createCategoryMutation } =
  useCreateCategory();

const { isPending: isUpdatingCategory, mutateAsync: updateCategoryMutation } =
  useUpdateCategory();

const submitButtonText = computed(() => {
  return mode === "create" ? "Создать категорию" : "Сохранить изменения";
});

const handleSubmit = async () => {
  const isValid = await v$.value.$validate();
  if (!isValid) {
    return;
  }

  if (mode === "create") {
    await createCategoryMutation(form.value, {
      onSuccess: () => {
        emits("success");
      },
      onError: (error: any) => {
        emits("error", error);
      },
    });
  } else {
    await updateCategoryMutation(
      {
        id: category!.id,
        data: {
          name: form.value.name,
        },
      },
      {
        onSuccess: () => {
          emits("success");
        },
        onError: (error: any) => {
          emits("error", error);
        },
      },
    );
  }
};

const handleCancel = () => {
  emits("cancel");
};

watch(
  () => category,
  (newCategory) => {
    if (newCategory) {
      form.value = {
        name: newCategory.name,
      } as Category;
    }
  },
  { immediate: true },
);
</script>
<template>
  <form class="space-y-6 max-w-2xl mx-auto p-6" @submit.prevent="handleSubmit">
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1" for="name">
        Название категории *
      </label>
      <input
        id="name"
        v-model="form.name"
        :class="[
          'w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition',
          v$.name.$error ? 'border-red-500' : 'border-gray-300',
        ]"
        placeholder="Введите название категории"
        type="text"
      />
      <div v-if="v$.name.$error" class="mt-1 text-sm text-red-600">
        <p v-for="error in v$.name.$errors" :key="error.$uid">
          {{ error.$message }}
        </p>
      </div>
    </div>

    <div class="flex justify-end space-x-4 pt-4 border-t">
      <button
        class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
        type="button"
        @click="handleCancel"
      >
        Отмена
      </button>
      <button
        :class="[
          'px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition',
          isCreatingCategory || isUpdatingCategory
            ? 'opacity-50 cursor-not-allowed'
            : '',
        ]"
        :disabled="isCreatingCategory || isUpdatingCategory"
        type="submit"
      >
        <span v-if="isCreatingCategory || isUpdatingCategory">
          Сохранение...
        </span>
        <span v-else>{{ submitButtonText }}</span>
      </button>
    </div>
  </form>
</template>
