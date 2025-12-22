<script lang="ts" setup>
import { useRouter } from "vue-router";
import CategoryForm from "../components/forms/CategoryForm.vue";
import { useToaster } from "../composables/useToaster.ts";

const router = useRouter();
const { success: notifySuccess, error: notifyError } = useToaster(
  3000,
  "top-right",
);

const handleSuccess = () => {
  notifySuccess("Категория успешно создана");
  router.push({ name: "categories" });
};

const handleError = (error: any) => {
  notifyError(
    `Ошибка создания категории: ${error.message || "Неизвестная ошибка"}`,
  );
};

const handleCancel = () => {
  router.push({ name: "categories" });
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Создать категорию</h1>
        <p class="mt-2 text-gray-600">
          Заполните форму для создания новой категории
        </p>
      </div>

      <div class="bg-white rounded-lg shadow p-6">
        <CategoryForm
          mode="create"
          @cancel="handleCancel"
          @error="handleError"
          @success="handleSuccess"
        />
      </div>
    </div>
  </div>
</template>
