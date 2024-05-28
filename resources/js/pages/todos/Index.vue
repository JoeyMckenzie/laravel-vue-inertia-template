<script lang="ts" setup>
import { Head } from '@inertiajs/vue3'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import TodosTable from '@/pages/todos/partials/TodosTable.vue'
import TodoStat from '@/pages/todos/partials/TodoStat.vue'
import type { PaginatedModel, Todo } from '@/lib/models'

defineProps<{
  todos: PaginatedModel<Todo>
}>()
</script>

<template>
  <Head title="Todos" />

  <AuthenticatedLayout>
    <template #header>
      <h2 class="text-xl font-semibold leading-tight">
        Todos
      </h2>
    </template>

    <div class="py-12">
      <div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div
          class="mb-4 grid grid-cols-1 space-x-0 space-y-4 sm:grid-cols-3 sm:space-x-4 sm:space-y-0"
        >
          <TodoStat />
          <TodoStat />
          <TodoStat />
        </div>
        <TodosTable :todos />
      </div>
    </div>
  </AuthenticatedLayout>
</template>
