<script setup lang="ts">
import { ref } from 'vue';
import ApplicationLogo from '@/components/ApplicationLogo.vue';
import Button from '@/components/ui/button/Button.vue';
import NavLink from '@/components/NavLink.vue';
import ResponsiveNavLink from '@/components/ResponsiveNavLink.vue';
import { Link } from '@inertiajs/vue3';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { Icon } from '@iconify/vue';

const showingNavigationDropdown = ref(false);
</script>

<template>
    <div>
        <div class="min-h-screen">
            <nav class="border-b border-neutral-100 dark:border-neutral-900">
                <!-- Primary Navigation Menu -->
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between h-16">
                        <div class="flex">
                            <!-- Logo -->
                            <div class="shrink-0 flex items-center">
                                <Link :href="route('dashboard')">
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
                                    :href="route('dashboard')"
                                    :active="route().current('dashboard')"
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        <div class="hidden sm:flex sm:items-center sm:ms-6">
                            <ThemeToggle />
                            <!-- Settings Dropdown -->
                            <div class="ms-3 relative">
                                <DropdownMenu>
                                    <DropdownMenuTrigger as-child>
                                        <Button variant="ghost">
                                            {{ $page.props.auth.user.name }}
                                            <Icon
                                                icon="iconamoon:profile-circle"
                                                class="ms-2 -me-0.5 h-4 w-4" /></Button
                                    ></DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel
                                            >My Account</DropdownMenuLabel
                                        >
                                        <DropdownMenuSeparator />
                                        <Link :href="route('profile.edit')">
                                            <DropdownMenuItem
                                                >Profile</DropdownMenuItem
                                            >
                                        </Link>
                                        <Link
                                            class="w-full"
                                            :href="route('logout')"
                                            method="post"
                                            as="button"
                                        >
                                            <DropdownMenuItem
                                                >Log out</DropdownMenuItem
                                            >
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
                                    showingNavigationDropdown =
                                        !showingNavigationDropdown
                                "
                            >
                                <Icon
                                    class="h-6 w-6"
                                    :class="{
                                        hidden: showingNavigationDropdown,
                                        'inline-flex':
                                            !showingNavigationDropdown,
                                    }"
                                    icon="material-symbols:menu"
                                />
                                <Icon
                                    class="h-6 w-6"
                                    :class="{
                                        hidden: !showingNavigationDropdown,
                                        'inline-flex':
                                            showingNavigationDropdown,
                                    }"
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
                    <div class="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink
                            :href="route('dashboard')"
                            :active="route().current('dashboard')"
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <!-- Responsive Settings Options -->
                    <div
                        class="pt-4 pb-1 border-t border-neutral-200 dark:border-neutral-800"
                    >
                        <div class="px-4">
                            <div class="font-medium text-base">
                                {{ $page.props.auth.user.name }}
                            </div>
                            <div
                                class="font-medium text-sm text-neutral-500 dark:text-neutral-400"
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
                                method="post"
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Page Heading -->
            <header v-if="$slots.header" class="shadow">
                <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
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
