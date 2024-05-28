<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { Link } from '@inertiajs/vue3'
import { ref } from 'vue'
import ApplicationLogo from '@/components/ApplicationLogo.vue'
import NavLink from '@/components/NavLink.vue'
import ResponsiveNavLink from '@/components/ResponsiveNavLink.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import Button from '@/components/ui/button/Button.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const showingNavigationDropdown = ref(false)
</script>

<template>
  <div>
    <div class="min-h-screen">
      <nav class="border-b border-neutral-100 dark:border-neutral-900">
        <!-- Primary Navigation Menu -->
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="flex h-16 justify-between">
            <div class="flex">
              <!-- Logo -->
              <div class="flex shrink-0 items-center">
                <Link :href="route('todos.index')">
                  <ApplicationLogo
                    class="block h-9 w-auto fill-current"
                  />
                </Link>
              </div>

              <!-- Navigation Links -->
              <div
                class="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex"
              >
                <NavLink
                  :active="route().current('dashboard')"
                  :href="route('todos.index')"
                >
                  Dashboard
                </NavLink>
              </div>
            </div>

            <div class="hidden sm:ms-6 sm:flex sm:items-center">
              <ThemeToggle />
              <!-- Settings Dropdown -->
              <div class="relative ms-3">
                <DropdownMenu>
                  <DropdownMenuTrigger as-child>
                    <Button variant="ghost">
                      {{ $page.props.auth.user.name }}
                      <Icon
                        class="-me-0.5 ms-2 size-4"
                        icon="iconamoon:profile-circle"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link :href="route('profile.edit')">
                      <DropdownMenuItem>
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <Link
                      :href="route('logout')"
                      as="button"
                      class="w-full"
                      method="post"
                    >
                      <DropdownMenuItem>
                        Log out
                      </DropdownMenuItem>
                    </Link>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <!-- Hamburger -->
            <div class="-me-2 flex items-center sm:hidden">
              <Button
                variant="ghost"
                @click="
                  showingNavigationDropdown
                    = !showingNavigationDropdown
                "
              >
                <Icon
                  :class="{
                    'hidden': showingNavigationDropdown,
                    'inline-flex':
                      !showingNavigationDropdown,
                  }"
                  class="size-6"
                  icon="material-symbols:menu"
                />
                <Icon
                  :class="{
                    'hidden': !showingNavigationDropdown,
                    'inline-flex':
                      showingNavigationDropdown,
                  }"
                  class="size-6"
                  icon="material-symbols:close"
                />
              </Button>
            </div>
          </div>
        </div>

        <!-- Responsive Navigation Menu -->
        <div
          :class="{
            block: showingNavigationDropdown,
            hidden: !showingNavigationDropdown,
          }"
          class="sm:hidden"
        >
          <div class="space-y-1 pb-3 pt-2">
            <ResponsiveNavLink
              :active="route().current('dashboard')"
              :href="route('todos.index')"
            >
              Dashboard
            </ResponsiveNavLink>
          </div>

          <!-- Responsive Settings Options -->
          <div
            class="border-t border-neutral-200 pb-1 pt-4 dark:border-neutral-800"
          >
            <div class="px-4">
              <div class="text-base font-medium">
                {{ $page.props.auth.user.name }}
              </div>
              <div
                class="text-sm font-medium text-neutral-500 dark:text-neutral-400"
              >
                {{ $page.props.auth.user.email }}
              </div>
            </div>

            <div class="mt-3 space-y-1">
              <ResponsiveNavLink :href="route('profile.edit')">
                Profile
              </ResponsiveNavLink>
              <ResponsiveNavLink
                :href="route('logout')"
                as="button"
                method="post"
              >
                Log Out
              </ResponsiveNavLink>
            </div>
          </div>
        </div>
      </nav>

      <!-- Page Heading -->
      <header v-if="$slots.header" class="shadow">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <slot name="header" />
        </div>
      </header>

      <!-- Page Content -->
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
