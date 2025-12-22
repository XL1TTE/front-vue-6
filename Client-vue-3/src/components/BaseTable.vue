<script generic="T extends BaseRow" lang="ts" setup>
import { useSlots } from "vue";

export interface BaseRow {
  [key: string]: any;
}

interface Props<T extends BaseRow> {
  rows: Array<T>;
  headers: Array<{
    key: keyof T;
    label: string;
  }>;
  actions?: Array<string>;
}

const props = defineProps<Props<T>>();

const slots = useSlots();

const hasCustomHeader = (key: keyof T): boolean => {
  return !!slots[`header-${String(key)}`];
};

const formatDefaultValue = (value: unknown): string => {
  if (value === null || value === undefined) {
    return "-";
  }
  return String(value);
};
</script>

<template>
  <div class="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th
            v-for="{ label, key } in props.headers"
            :key="key"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            scope="col"
          >
            <div class="flex flex-col space-y-2">
              <span v-if="!hasCustomHeader(key)">{{ label }}</span>
              <slot
                v-else
                :key="key"
                :label="label"
                :name="`header-${String(key)}`"
              >
                {{ label }}
              </slot>
            </div>
          </th>
          <th
            v-if="!!actions"
            :key="`header-actions`"
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            scope="col"
          >
            {{ `Действия` }}
          </th>
        </tr>
      </thead>

      <tbody class="bg-white divide-y divide-gray-200">
        <tr
          v-for="(row, index) in rows"
          :key="index"
          class="hover:bg-gray-50 transition-colors duration-150"
        >
          <td
            v-for="{ key } in props.headers"
            :key="key"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
          >
            <div class="flex items-center">
              <slot :name="key" :row="row" :value="row[key]">
                <span class="text-gray-900">
                  {{ formatDefaultValue(row[key]) }}
                </span>
              </slot>
            </div>
          </td>
          <td
            v-if="!!actions"
            :key="`actions`"
            class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
          >
            <div class="flex items-center gap-2">
              <slot v-for="key in actions" :name="key" :row="row">
                <span class="text-gray-900">
                  {{ key }}
                </span>
              </slot>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="rows.length === 0" class="text-center py-8 bg-white">
      <p class="text-gray-500">Нет данных для отображения</p>
    </div>
  </div>
</template>
