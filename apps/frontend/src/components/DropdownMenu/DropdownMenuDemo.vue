<template>
  <DropdownMenu>
    <DropdownMenuTrigger>Open Dropdown</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem @select="() => onSelect('Profile')">Profile</DropdownMenuItem>
      <DropdownMenuItem @select="() => onSelect('Billing')">Billing</DropdownMenuItem>
      <DropdownMenuItem @select="() => onSelect('Team')">Team</DropdownMenuItem>
      <DropdownMenuItem @select="() => onSelect('Subscription')">Subscription</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">
import DropdownMenu from './DropdownMenu.vue'
import DropdownMenuTrigger from './DropdownMenuTrigger.vue'
import DropdownMenuContent from './DropdownMenuContent.vue'
import DropdownMenuItem from './DropdownMenuItem.vue'
import DropdownMenuLabel from './DropdownMenuLabel.vue'
import DropdownMenuSeparator from './DropdownMenuSeparator.vue'

function onSelect(item: string) {
  // eslint-disable-next-line no-console
  console.log('Selected:', item)
}
</script>
