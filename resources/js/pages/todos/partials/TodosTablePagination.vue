<script lang="ts" setup>
import { Link } from '@inertiajs/vue3'
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from '@/components/ui/pagination'
import { Button } from '@/components/ui/button'
import type { PaginatedTodos } from '@/lib/models'

defineProps<{
  todos: PaginatedTodos
}>()
</script>

<template>
  <Pagination
    v-slot="{ page }"
    :default-page="todos.current_page"
    :sibling-count="1"
    :total="todos.total"
    show-edges
  >
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <Link
        :disabled="todos.current_page === 1"
        :href="route('todos.index', { page: 1 })"
        as="button"
        preserve-scroll
      >
        <PaginationFirst />
      </Link>

      <Link
        :disabled="todos.current_page === 1"
        :href="route('todos.index', { page: todos.current_page - 1 })"
        as="button"
        preserve-scroll
      >
        <PaginationPrev />
      </Link>

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child
        >
          <Link
            :href="route('todos.index', { page: item.value })"
            preserve-scroll
          >
            <Button
              :variant="
                item.value === page ? 'default' : 'outline'
              "
              class="size-10 p-0"
            >
              {{ item.value }}
            </Button>
          </Link>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <Link
        :disabled="todos.current_page === todos.last_page"
        :href="route('todos.index', { page: todos.current_page + 1 })"
        as="button"
        preserve-scroll
      >
        <PaginationNext />
      </Link>

      <Link
        :disabled="todos.current_page === todos.last_page"
        :href="route('todos.index', { page: todos.last_page })"
        as="button"
        preserve-scroll
      >
        <PaginationLast />
      </Link>
    </PaginationList>
  </Pagination>
</template>
