<script setup lang="ts">
import { ref } from 'vue';
import {
    DateFormatter,
    type DateValue,
    getLocalTimeZone,
} from '@internationalized/date';
import { Calendar as CalendarIcon } from 'lucide-vue-next';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

const emit = defineEmits<{
    dateSelected: [value?: DateValue];
}>();

const df = new DateFormatter('en-US', {
    dateStyle: 'long',
});

const value = ref<DateValue>();
</script>

<template>
    <Popover>
        <PopoverTrigger as-child>
            <Button
                variant="outline"
                :class="cn(
                    'justify-start text-left font-normal',
                    !value && 'text-muted-foreground',
                )"
            >
                <CalendarIcon class="mr-2 size-4" />
                {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
            <Calendar v-model="value" initial-focus @change="emit('dateSelected', value)" />
        </PopoverContent>
    </Popover>
</template>
