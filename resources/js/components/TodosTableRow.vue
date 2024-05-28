<script lang="ts" setup>
import { Link } from '@inertiajs/vue3';
import { TableCell, TableRow } from '@/components/ui/table';
import { Icon } from '@iconify/vue';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { computed } from 'vue';
import { Todo } from '@/lib/models';
import Button from '@/components/ui/button/Button.vue';

const props = defineProps<{
    todo: Todo;
}>();

type BadgeType =
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | null
    | undefined;

const statusBadge = computed((): { variant: BadgeType; icon: string } => {
    switch (props.todo.status) {
        case 'Done':
            return {
                variant: 'default',
                icon: 'gg:check-o',
            };
        case 'Cancelled':
            return {
                variant: 'destructive',
                icon: 'mdi:cancel',
            };
        case 'In Progress':
            return {
                variant: 'secondary',
                icon: 'wi:stars',
            };
        default:
            return {
                variant: 'outline',
                icon: 'formkit:start',
            };
    }
});
</script>

<template>
    <TableRow>
        <TableCell class="font-medium">{{ todo.name }}</TableCell>
        <TableCell>
            <Badge :variant="statusBadge.variant">
                <Icon :icon="statusBadge.icon" class="mr-2 h-4 w-4" />
                {{ todo.status }}
            </Badge>
        </TableCell>
        <TableCell class-name="truncate">{{ todo.title }}}</TableCell>
        <TableCell>
            <DropdownMenu>
                <DropdownMenuTrigger as-child>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                        <Icon class-name="h-4 w-4" icon="lucide:ellipsis" />
                        <span class="sr-only">Toggle menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link
                        :href="route('todos.show', todo.id)"
                        as="button"
                        class="w-full"
                    >
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                    </Link>
                    <Link
                        :href="route('todos.destroy', todo.id)"
                        as="button"
                        class="w-full text-destructive"
                        method="delete"
                        preserve-scroll
                    >
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                    </Link>
                </DropdownMenuContent>
            </DropdownMenu>
        </TableCell>
    </TableRow>
</template>
