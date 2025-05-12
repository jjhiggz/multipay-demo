<script setup lang="ts">
// No script logic needed for this static page, but setup is here if you expand
</script>

<template>
  <div class="bg-gradient-to-br from-slate-900 to-slate-700 min-h-screen text-white">
    <!-- Navigation Bar -->
    <nav class="top-0 z-50 fixed bg-slate-800 bg-opacity-50 shadow-lg backdrop-blur-md p-4 w-full">
      <div class="flex justify-between items-center mx-auto container">
        <a href="#" class="font-bold hover:text-sky-400 text-2xl transition-colors"
          >My Awesome App</a
        >
        <div>
          <a href="#" class="hover:bg-sky-500 px-4 py-2 rounded-md transition-colors">Home</a>
          <a href="#" class="hover:bg-sky-500 px-4 py-2 rounded-md transition-colors">Features</a>
          <a href="#" class="hover:bg-sky-500 px-4 py-2 rounded-md transition-colors">Pricing</a>
          <a
            href="#"
            class="bg-sky-600 hover:bg-sky-500 ml-2 px-4 py-2 rounded-md font-semibold transition-colors"
            >Sign Up</a
          >
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <header class="pt-32 pb-16 text-center">
      <div class="mx-auto px-4 container">
        <h1 class="mb-6 font-extrabold text-5xl md:text-7xl leading-tight">
          Build Something
          <span class="bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 text-transparent"
            >Incredible</span
          >
        </h1>
        <p class="mx-auto mb-10 max-w-3xl text-slate-300 text-xl md:text-2xl">
          Our platform provides all the tools you need to bring your ideas to life. Fast, reliable,
          and easy to use.
        </p>
        <div class="space-x-4">
          <a
            href="#"
            class="bg-sky-600 hover:bg-sky-500 shadow-md hover:shadow-lg px-8 py-3 rounded-lg font-semibold text-white text-lg hover:scale-105 transition-all duration-300 transform"
          >
            Get Started
          </a>
          <a
            href="#"
            class="bg-slate-700 hover:bg-slate-600 shadow-md hover:shadow-lg px-8 py-3 rounded-lg font-semibold text-white text-lg hover:scale-105 transition-all duration-300 transform"
          >
            Learn More
          </a>
        </div>
      </div>
    </header>

    <!-- Content Section -->
    <main class="py-16">
      <div class="mx-auto px-4 container">
        <h2 class="mb-12 font-bold text-sky-400 text-4xl text-center">Why Choose Us?</h2>
        <div class="gap-8 grid md:grid-cols-3">
          <!-- Feature Card 1 -->
          <div
            class="bg-slate-800 shadow-2xl hover:shadow-sky-500/30 p-8 rounded-xl transition-shadow duration-300"
          >
            <div class="mb-4 text-sky-400">
              <!-- Replace with an actual icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-12 h-12"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                />
              </svg>
            </div>
            <h3 class="mb-3 font-semibold text-2xl">Lightning Fast</h3>
            <p class="text-slate-400">
              Experience blazing speed and performance that keeps your users engaged.
            </p>
          </div>
          <!-- Feature Card 2 -->
          <div
            class="bg-slate-800 shadow-2xl hover:shadow-sky-500/30 p-8 rounded-xl transition-shadow duration-300"
          >
            <div class="mb-4 text-sky-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-12 h-12"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622A11.99 11.99 0 0018.402 6a11.959 11.959 0 01-2.101-1.036m-7.498 0A11.997 11.997 0 0112 2.25c1.121 0 2.203.158 3.202.441m-6.404 0A11.959 11.959 0 0112 2.25c1.121 0 2.203.158 3.202.441m1.003-1.036A11.959 11.959 0 0112 2.25c1.121 0 2.203.158 3.202.441m-6.404 0A11.959 11.959 0 0112 2.25c1.121 0 2.203.158 3.202.441"
                />
              </svg>
            </div>
            <h3 class="mb-3 font-semibold text-2xl">Rock Solid Security</h3>
            <p class="text-slate-400">
              Your data is safe with us. We implement top-tier security measures.
            </p>
          </div>
          <!-- Feature Card 3 -->
          <div
            class="bg-slate-800 shadow-2xl hover:shadow-sky-500/30 p-8 rounded-xl transition-shadow duration-300"
          >
            <div class="mb-4 text-sky-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-12 h-12"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>
            </div>
            <h3 class="mb-3 font-semibold text-2xl">Highly Customizable</h3>
            <p class="text-slate-400">
              Tailor the platform to your exact needs with extensive customization options.
            </p>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-slate-800 bg-opacity-70 py-8 text-center">
      <div class="mx-auto px-4 container">
        <p class="text-slate-400">&copy; 2024 My Awesome App. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
/* Add any component-specific styles here if needed */
/* Example: Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}
</style>
