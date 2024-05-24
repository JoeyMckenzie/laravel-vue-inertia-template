<script setup lang="ts">
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue';
import { Head } from '@inertiajs/vue3';
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
                    class="overflow-hidden shadow-sm bg-neutral-50 dark:bg-neutral-900 sm:rounded-lg"
                >
                    <div class="p-6">You're logged in!</div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
