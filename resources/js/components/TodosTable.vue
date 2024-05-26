<script lang="ts" setup>
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
import TodosTablePagination from '@/components/TodosTablePagination.vue';
import { PaginatedTodos } from '@/lib/models';
import TodoTableRow from '@/components/TodosTableRow.vue';

defineProps<{
    todos: PaginatedTodos;
}>();
</script>

<template>
    <Card>
        <CardHeader class="px-7">
            <CardTitle>Todos</CardTitle>
            <CardDescription
                >Manage your todos for the day, week, or whenever.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Title</TableHead>
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
