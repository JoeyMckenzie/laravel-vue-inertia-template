<script setup lang="ts">
import { ref } from 'vue';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { TodoStatus } from '@/lib/models';

const emit = defineEmits<{
    statusSelected: [value: TodoStatus];
}>();

const statusValue = ref<TodoStatus>('Not Started');

const creatableStatuses: TodoStatus[] = [
    'Not Started',
    'In Progress',
    'Done',
];
</script>

<template>
    <Select v-model="statusValue" class="col-span-3" @update:model-value="emit('statusSelected', statusValue)">
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
</template>
