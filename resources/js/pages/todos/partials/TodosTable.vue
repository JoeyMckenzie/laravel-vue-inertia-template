<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { useFocus } from '@vueuse/core';
import type {
    DateValue,
} from '@internationalized/date';
import {
    DateFormatter,

    getLocalTimeZone,
    now,
} from '@internationalized/date';
import { useForm } from '@inertiajs/vue3';
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import TodosTablePagination from './TodosTablePagination.vue';
import TodoTableRow from './TodosTableRow.vue';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import Input from '@/components/ui/input/Input.vue';
import InputError from '@/components/InputError.vue';
import Label from '@/components/ui/label/Label.vue';
import type { PaginatedTodos, TodoStatus } from '@/lib/models';
import Button from '@/components/ui/button/Button.vue';
import DialogTrigger from '@/components/ui/dialog/DialogTrigger.vue';

defineProps<{
    todos: PaginatedTodos;
}>();

const df = new DateFormatter('en-US', {
    dateStyle: 'long',
});

const titleInput = ref<HTMLInputElement | null>(null);
const dueByDate = ref<HTMLInputElement | null>(null);
const { focused } = useFocus(titleInput);

const form = useForm<{
    title: string;
    status?: TodoStatus;
    due_by?: DateValue;
}>({
    title: '',
});

const currentDate = now('America/Los_Angeles');
const creatableStatuses: TodoStatus[] = [
    'Not Started',
    'In Progress',
    'Done',
];

function createTodo() {
    form.post(route('todos.store'), {
        onSuccess: () => {
            form.reset();
        },
        onError: () => {
            if (form.errors.title) {
                focused.value = true;
            }

            if (form.errors.due_by) {
                focused.value = true;
            }
        },
    });
}
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
            <Dialog>
                <DialogTrigger as-child>
                    <Button class="flex flex-row gap-x-1">
                        Add todo
                        <Icon icon="gg:add" class="size-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent class="sm:max-w-[450px]">
                    <DialogHeader>
                        <DialogTitle>
                            Create a todo
                        </DialogTitle>
                        <DialogDescription>
                            Create a new todo given a title, relvant status, and a due date.
                        </DialogDescription>
                    </DialogHeader>
                    <form @submit.prevent="createTodo">
                        <div class="grid grid-cols-4 items-center gap-4 py-2">
                            <Label for="title" class="text-right">Title</Label>
                            <Input
                                id="title"
                                ref="titleInput"
                                v-model="form.title"
                                type="text"
                                class="col-span-3"
                                placeholder="Create a Laravel starter kit with Vue"
                                required
                            />
                            <InputError :message="form.errors.title" class="mt-2" />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4 py-2">
                            <Label class="text-right">Status</Label>
                            <div class="col-span-3">
                                <Select v-model="form.status" class="col-span-3">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Statuses</SelectLabel>
                                            <SelectItem v-for="status in creatableStatuses" :key="status" :value="status">
                                                {{ status }}
                                            </SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <InputError :message="form.errors.status" class="mt-2" />
                            </div>
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4 py-2">
                            <Label class="text-right">Due by</Label>
                            <Popover>
                                <PopoverTrigger as-child>
                                    <Button
                                        variant="outline"
                                        :class="cn(
                                            'justify-start text-left font-normal col-span-3',
                                            !form.due_by && 'text-muted-foreground',
                                        )"
                                    >
                                        <CalendarIcon class="mr-2 size-4" />
                                        {{ form.due_by ? df.format(form.due_by.toDate(getLocalTimeZone())) : "Pick a date" }}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent class="w-auto p-0">
                                    <Calendar ref="dueByDate" v-model="form.due_by" initial-focus :min-value="currentDate" />
                                </PopoverContent>
                            </Popover>
                            <InputError :message="form.errors.due_by" class="mt-2" />
                        </div>
                        <DialogFooter class="mt-6 flex justify-end">
                            <DialogClose as-child>
                                <Button
                                    variant="secondary"
                                    class="ms-3"
                                    :disabled="form.processing"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                class="ms-3"
                                :class="{ 'opacity-25': form.processing }"
                                :disabled="form.processing"
                                type="submit"
                            >
                                Create
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
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
