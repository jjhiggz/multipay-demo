<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
</script>

<template>
  <h1>hello</h1>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button
        class="bg-gradient-to-r from-purple-500 hover:from-purple-600 to-pink-500 hover:to-pink-600 px-4 py-2 rounded-lg text-white transition-all"
      >
        fuck
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      class="bg-gradient-to-br from-indigo-100 to-purple-100 shadow-lg border-2 border-purple-200 w-56"
    >
      <DropdownMenuLabel class="font-bold text-purple-800">My Account</DropdownMenuLabel>
      <DropdownMenuSeparator class="bg-purple-200" />
      <DropdownMenuGroup>
        <DropdownMenuItem class="hover:bg-purple-200/50 transition-colors">
          <span>Profile</span>
          <DropdownMenuShortcut class="text-purple-600">⇧⌘P</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem class="hover:bg-pink-200/50 transition-colors">
          <span>Billing</span>
          <DropdownMenuShortcut class="text-pink-600">⌘B</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem class="hover:bg-blue-200/50 transition-colors">
          <span>Settings</span>
          <DropdownMenuShortcut class="text-blue-600">⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuItem class="hover:bg-green-200/50 transition-colors">
          <span>Keyboard shortcuts</span>
          <DropdownMenuShortcut class="text-green-600">⌘K</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator class="bg-purple-200" />
      <DropdownMenuGroup>
        <DropdownMenuItem class="hover:bg-yellow-200/50 transition-colors">
          <span>Team</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger class="hover:bg-orange-200/50 transition-colors">
            <span>Invite users</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent
              class="bg-gradient-to-br from-orange-100 to-yellow-100 border-2 border-orange-200"
            >
              <DropdownMenuItem class="hover:bg-orange-200/50 transition-colors">
                <span>Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem class="hover:bg-orange-200/50 transition-colors">
                <span>Message</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator class="bg-orange-200" />
              <DropdownMenuItem class="hover:bg-orange-200/50 transition-colors">
                <span>More...</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem class="hover:bg-teal-200/50 transition-colors">
          <span>New Team</span>
          <DropdownMenuShortcut class="text-teal-600">⌘+T</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator class="bg-purple-200" />
      <DropdownMenuItem class="hover:bg-red-200/50 transition-colors">
        <span>GitHub</span>
      </DropdownMenuItem>
      <DropdownMenuItem class="hover:bg-red-200/50 transition-colors">
        <span>Support</span>
      </DropdownMenuItem>
      <DropdownMenuItem disabled class="hover:bg-gray-200/50 opacity-50 transition-colors">
        <span>API</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator class="bg-purple-200" />
      <DropdownMenuItem class="hover:bg-red-200/50 transition-colors">
        <span>Log out</span>
        <DropdownMenuShortcut class="text-red-600">⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
