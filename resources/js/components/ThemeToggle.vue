<script lang="ts" setup>
import { useColorMode } from '@vueuse/core';
import { Icon } from '@iconify/vue';
import { Button } from '@/components/ui/button';

const mode = useColorMode();

function toggleMode() {
    const updatedMode = mode.value === 'light' ? 'dark' : 'light';
    mode.value = updatedMode;
}
</script>

<template>
    <Button variant="ghost" @click="toggleMode">
        <Icon
            class="absolute size-[1.2rem] rotate-90 scale-0 text-white transition-all dark:rotate-0 dark:scale-100"
            icon="radix-icons:sun"
        />
        <Icon
            class="size-[1.2rem] rotate-0 scale-100 text-black transition-all dark:-rotate-90 dark:scale-0"
            icon="radix-icons:moon"
        />
        <span class="sr-only">Toggle theme</span>
    </Button>
</template>
