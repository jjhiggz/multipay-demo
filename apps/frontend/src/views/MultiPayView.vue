<template>
  <div class="flex flex-col bg-gray-50 min-h-screen">
    <!-- Header -->
    <header class="flex justify-between items-center bg-white px-8 py-4 border-gray-200 border-b">
      <div class="flex items-center gap-4">
        <!-- Logo using imported SVG -->
        <img :src="logoUrl" alt="Logo" class="w-10 h-10" />
      </div>
      <div class="flex items-center gap-3 bg-gray-100 shadow-sm px-4 py-2 rounded-full">
        <div class="flex flex-col items-end mr-2">
          <span class="font-semibold text-sm leading-tight">Baldo Pizzas</span>
          <span class="text-gray-500 text-xs leading-tight">Nico Baldovino</span>
        </div>
        <div
          class="flex justify-center items-center bg-gradient-to-br from-blue-300 to-blue-500 shadow border-2 border-white rounded-full w-10 h-10 font-bold text-white text-lg"
        >
          <span>N</span>
        </div>
        <svg
          class="ml-1 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex flex-col flex-1 items-center px-4 py-8">
      <div class="bg-white shadow p-8 rounded-lg w-full max-w-5xl">
        <div class="flex justify-between items-center mb-8">
          <h1 class="font-semibold text-2xl">Send money to multiple recipients</h1>
          <button class="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
        </div>
        <div class="gap-4 grid grid-cols-1 md:grid-cols-4 mb-8">
          <div>
            <label class="block mb-1 text-gray-500 text-xs">Send on</label>
            <select class="px-3 py-2 border rounded w-full">
              <option>April 21st, 2025</option>
            </select>
          </div>
          <div>
            <label class="block mb-1 text-gray-500 text-xs">Sending currency</label>
            <select class="px-3 py-2 border rounded w-full">
              <option>US Dollar (USD)</option>
            </select>
          </div>
          <div>
            <label class="block mb-1 text-gray-500 text-xs">Transfer amount currency</label>
            <select class="px-3 py-2 border rounded w-full">
              <option>Recipient's currency (USD)</option>
            </select>
          </div>
        </div>
        <!-- Recipients Table Placeholder -->
        <div class="mt-8">
          <!-- Table will go here -->
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import logoUrl from '../assets/logo.svg'
// No logic yet, just static layout
</script>
