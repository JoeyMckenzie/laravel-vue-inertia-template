<script lang="ts" setup>
import { Link } from '@inertiajs/vue3'
import { Icon } from '@iconify/vue'
import { computed } from 'vue'
import { format } from 'date-fns'
import { TableCell, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { Todo } from '@/lib/models'
import Button from '@/components/ui/button/Button.vue'

const props = defineProps<{
  todo: Todo
}>()

type BadgeType =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | null
  | undefined

const statusBadge = computed((): { variant: BadgeType, icon: string } => {
  switch (props.todo.status) {
    case 'Done':
      return {
        variant: 'default',
        icon: 'gg:check-o',
      }
    case 'Overdue':
      return {
        variant: 'destructive',
        icon: 'lucide:calendar-x',
      }
    case 'In Progress':
      return {
        variant: 'secondary',
        icon: 'wi:stars',
      }
    default:
      return {
        variant: 'outline',
        icon: 'formkit:start',
      }
  }
})

const formattedDueBy = computed(() => format(props.todo.due_by, 'PP'))
</script>

<template>
  <TableRow>
    <TableCell class="font-medium">
      {{ todo.name }}
    </TableCell>
    <TableCell>
      <Badge :variant="statusBadge.variant">
        <Icon :icon="statusBadge.icon" class="mr-2 size-4" />
        {{ todo.status }}
      </Badge>
    </TableCell>
    <TableCell class="truncate">
      {{ todo.title }}
    </TableCell>
    <TableCell>
      {{ formattedDueBy }}
    </TableCell>
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <Icon class="size-4" icon="lucide:ellipsis" />
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
