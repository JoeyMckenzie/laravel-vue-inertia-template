<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { ref } from 'vue'
import AddTodoForm from './AddTodoForm.vue'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import TodosTablePagination from '@/components/TodosTablePagination.vue'
import type { PaginatedTodos } from '@/lib/models'
import TodoTableRow from '@/components/TodosTableRow.vue'
import Button from '@/components/ui/button/Button.vue'

defineProps<{
  todos: PaginatedTodos
}>()

const createModalOpen = ref(false)
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row justify-between px-7">
      <div className="flex flex-col justify-center">
        <CardTitle>Todos</CardTitle>
        <CardDescription class="hidden sm:block">
          Manage your todos for the day, week, or whenever.
        </CardDescription>
      </div>
      <Button class="flex flex-row gap-x-1" @click="createModalOpen = true">
        Add todo
        <Icon icon="gg:add" class="size-4" />
      </Button>
      <AddTodoForm :open="createModalOpen" @todo-cancelled="createModalOpen = false" />
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Due by</TableHead>
            <TableHead>
              <span class="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TodoTableRow
            v-for="todo in todos.data"
            :key="todo.name"
            :todo="todo"
          />
        </TableBody>
      </Table>
    </CardContent>
    <CardFooter class="flex flex-col justify-center gap-y-4">
      <TodosTablePagination :todos />
      <div class="text-xs text-muted-foreground">
        Showing <strong>{{ todos.from }} - {{ todos.to }}</strong> of
        <strong>{{ todos.total }}</strong> todos
      </div>
    </CardFooter>
  </Card>
</template>
