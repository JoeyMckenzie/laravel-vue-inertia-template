<script lang="ts" setup>
import TodosTablePagination from './TodosTablePagination.vue';
import TodoTableRow from './TodosTableRow.vue';
import CreateTodoModalForm from './CreateTodoModalForm.vue';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

import type { PaginatedTodos } from '@/lib/models';

defineProps<{
    todos: PaginatedTodos;
}>();
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
            <CreateTodoModalForm />
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
