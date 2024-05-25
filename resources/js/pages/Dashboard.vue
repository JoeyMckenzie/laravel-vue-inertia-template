<script lang="ts" setup>
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
import TodosTable from '@/components/TodosTable.vue';
import TodoStat from '@/components/TodoStat.vue';
</script>

<template>
    <Head title="Dashboard" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl -800 leading-tight">Dashboard</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div
                    class="mb-4 grid grid-cols-1 space-x-0 space-y-4 sm:grid-cols-3 sm:space-x-4 sm:space-y-0"
                >
                    <TodoStat />
                    <TodoStat />
                    <TodoStat />
                </div>
                <TodosTable />
            </div>
        </div>
    </AuthenticatedLayout>
</template>
