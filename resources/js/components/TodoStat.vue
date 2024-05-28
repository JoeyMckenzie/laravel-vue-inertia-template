<script lang="ts" setup>
import { Icon } from '@iconify/vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
</script>

<template>
  <Card>
    <CardHeader
      class="flex flex-row items-center justify-between space-y-0 pb-2"
    >
      <CardTitle class="text-sm font-medium">
        Total Revenue
      </CardTitle>
      <Icon class="size-4 text-muted-foreground" icon="mdi:dollar" />
    </CardHeader>
    <CardContent>
      <div class="text-2xl font-bold">
        $45,231.89
      </div>
      <p class="text-xs text-muted-foreground">
        +20.1% from last month
      </p>
    </CardContent>
  </Card>
</template>
