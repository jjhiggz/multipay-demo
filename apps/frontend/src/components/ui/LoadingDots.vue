<template>
  <div class="flex justify-center items-center p-2.5">
    <span
      class="bg-blue-400 mx-[3px] rounded-full w-2 h-2 animate-dot-pulse"
      style="animation-delay: -0.32s"
    ></span>
    <span
      class="bg-blue-400 mx-[3px] rounded-full w-2 h-2 animate-dot-pulse"
      style="animation-delay: -0.16s"
    ></span>
    <span
      class="bg-blue-400 mx-[3px] rounded-full w-2 h-2 animate-dot-pulse"
    ></span>
  </div>
</template>

<style scoped>
@keyframes dot-pulse {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-dot-pulse {
  animation: dot-pulse 1.4s infinite ease-in-out both;
}
</style>
