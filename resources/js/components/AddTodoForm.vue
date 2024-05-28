<script setup lang="ts">
import { useForm } from '@inertiajs/vue3'
import { ref } from 'vue'
import { useFocus } from '@vueuse/core'
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
} from '@internationalized/date'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Input from '@/components/ui/input/Input.vue'
import InputError from '@/components/InputError.vue'
import Label from '@/components/ui/label/Label.vue'
import Button from '@/components/ui/button/Button.vue'
import TodoDueByDate from '@/components/TodoDueByDate.vue'
import TodoStatusSelect from '@/components/TodoStatusSelect.vue'
import type { TodoStatus } from '@/lib/models'

defineProps<{
  open: boolean
}>()

const emit = defineEmits(['todoCreated', 'todoCancelled'])

const titleInput = ref<HTMLInputElement | null>(null)
const dueByDate = ref<HTMLInputElement | null>(null)
const { focused } = useFocus(titleInput)

const form = useForm<{
  title: string
  status?: TodoStatus
  due_by?: DateValue
}>({
  title: '',
})

function cancelCreation() {
  form.reset()
  emit('todoCancelled')
}

function createTodo() {
  console.log({ form })

  form.post(route('todos.store'), {
    onSuccess: () => {
      form.reset()
      emit('todoCreated')
    },
    onError: () => {
      if (form.errors.title) {
        focused.value = true
      }

      if (form.errors.due_by) {
        focused.value = true
      }
    },
  })
}

const updateStatusValue = (value: TodoStatus) => (form.status = value)
const updateDueByValue = (value?: DateValue) => (form.due_by = value)
</script>

<template>
  <Dialog :open="open">
    <DialogContent class="w-full">
      <DialogHeader>
        <DialogTitle>
          Create a todo
        </DialogTitle>
        <DialogDescription>
          Create a new todo given a title, relvant status, and a due date.
        </DialogDescription>
      </DialogHeader>
      <form @submit.prevent="createTodo">
        <div class="gap-4 py-4">
          <Label for="title" class="sr-only">Title</Label>
          <Input
            id="title"
            ref="titleInput"
            v-model="form.title"
            type="text"
            class="mt-1 block w-full"
            placeholder="Create a Laravel starter kit..."
            required
          />
          <InputError :message="form.errors.title" class="mt-2" />
        </div>
        <div class="flex w-full flex-row gap-x-4">
          <div class="gap-4 py-4">
            <TodoStatusSelect @status-selected="updateStatusValue" />
            <InputError :message="form.errors.status" class="mt-2" />
          </div>
          <div class="gap-4 py-4">
            <TodoDueByDate ref="dueByDate" @date-selected="updateDueByValue" />
            <InputError :message="form.errors.due_by" class="mt-2" />
          </div>
        </div>
        <DialogFooter class="mt-6 flex justify-end">
          <DialogClose as-child>
            <Button
              variant="secondary"
              class="ms-3"
              :disabled="form.processing"
              @click="cancelCreation"
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
