<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3'
import { route } from 'ziggy-js'
import GuestLayout from '@/layouts/GuestLayout.vue'
import InputError from '@/components/InputError.vue'
import Label from '@/components/ui/label/Label.vue'
import Button from '@/components/ui/button/Button.vue'
import Input from '@/components/ui/input/Input.vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const form = useForm({
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
})

function submit() {
  form.post(route('register'), {
    onFinish: () => {
      form.reset('password', 'password_confirmation')
    },
  })
}
</script>

<template>
  <GuestLayout>
    <Head title="Register" />

    <form @submit.prevent="submit">
      <Card class="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle class="text-2xl">
            Register
          </CardTitle>
          <CardDescription>
            Enter your name and email below to register for an
            account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-4">
            <div class="grid gap-2">
              <Label for="name">Name</Label>
              <Input
                id="name"
                v-model="form.name"
                type="text"
                class="mt-1 block w-full"
                required
                autofocus
                autocomplete="name"
              />
              <InputError
                class="mt-2"
                :message="form.errors.name"
              />
            </div>
            <div class="grid gap-2">
              <Label for="email">Email</Label>

              <Input
                id="email"
                v-model="form.email"
                type="email"
                class="mt-1 block w-full"
                required
                autocomplete="username"
              />

              <InputError
                class="mt-2"
                :message="form.errors.email"
              />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input
                id="password"
                v-model="form.password"
                type="password"
                class="mt-1 block w-full"
                required
                autocomplete="new-password"
              />
              <InputError
                class="mt-2"
                :message="form.errors.password"
              />
            </div>
            <div class="grid gap-2">
              <Label for="password_confirmation">Confirm Password</Label>
              <Input
                id="password_confirmation"
                v-model="form.password_confirmation"
                type="password"
                class="mt-1 block w-full"
                required
                autocomplete="new-password"
              />
              <InputError
                class="mt-2"
                :message="form.errors.password_confirmation"
              />
            </div>
            <Button
              type="submit"
              class="w-full"
              :class="{ 'opacity-25': form.processing }"
              :disabled="form.processing"
            >
              Sign up
            </Button>
          </div>
          <div class="mt-4 text-center text-sm">
            Have an account?
            <Link :href="route('login')" class="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </form>
  </GuestLayout>
</template>
