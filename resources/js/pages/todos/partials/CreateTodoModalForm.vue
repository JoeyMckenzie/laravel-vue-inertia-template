<script setup lang="ts">
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
import { Calendar as CalendarIcon, PlusCircleIcon } from 'lucide-vue-next';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
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
import type { TodoStatus } from '@/lib/models';
import Button from '@/components/ui/button/Button.vue';
import DialogTrigger from '@/components/ui/dialog/DialogTrigger.vue';

const open = ref(false);
const titleInput = ref<HTMLInputElement | null>(null);
const statusInput = ref<HTMLInputElement | null>(null);
const dueByDateInput = ref<HTMLInputElement | null>(null);
const { focused: titleFocused } = useFocus(titleInput);
const { focused: statusFocused } = useFocus(titleInput);
const { focused: dueByDateFocused } = useFocus(titleInput);
const currentDate = now(getLocalTimeZone());

const df = new DateFormatter('en-US', {
    dateStyle: 'long',
});

const creatableStatuses: TodoStatus[] = [
    'Not Started',
    'In Progress',
    'Done',
];

const form = useForm<{
    title: string;
    status: TodoStatus;
    due_by: DateValue;
}>({
    title: '',
    due_by: currentDate,
    status: 'Not Started',
});

function createTodo() {
    form.transform(data => ({
        ...data,
        due_by: data.due_by.toDate(getLocalTimeZone()),
    }))
        .post(route('todos.store'), {
            onSuccess: () => {
                form.reset();
                toggleModal();
            },
            onError: () => {
                if (form.errors.title) {
                    titleFocused.value = true;
                    return;
                }

                if (form.errors.status) {
                    statusFocused.value = true;
                    return;
                }

                if (form.errors.due_by) {
                    dueByDateFocused.value = true;
                }
            },
        });
}

function onModalOpenChange() {
    toggleModal();
    if (!open.value) {
        form.reset();
    }
}

function toggleModal() {
    open.value = !open.value;
}
</script>

<template>
    <Dialog :open="open" @update:open="onModalOpenChange">
        <DialogTrigger as-child>
            <Button class="flex flex-row gap-x-1">
                Add todo
                <PlusCircleIcon class="size-4" />
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
                        <Select ref="statusInput" v-model="form.status" class="col-span-3">
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
                        <div class="col-span-3 flex flex-col">
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
                            <InputError :message="form.errors.due_by" class="mt-2" />
                        </div>
                        <PopoverContent class="w-auto p-0">
                            <Calendar ref="dueByDateInput" v-model="form.due_by" initial-focus :min-value="currentDate" />
                        </PopoverContent>
                    </Popover>
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
</template>
