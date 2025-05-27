<template>
  <Transition name="modal-fade">
    <div
      v-if="props.state.isVisible.value"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div class="bg-white shadow-xl m-4 p-6 rounded-lg w-full max-w-md">
        <div class="flex items-center">
          <Icon
            v-if="props.state.icon.value === 'warning'"
            icon="carbon:warning-filled"
            class="mr-2 text-yellow-500 text-xl"
          />
          <h3 class="font-medium text-gray-900 text-lg leading-6">
            {{ props.state.title.value }}
          </h3>
        </div>
        <div class="mt-2">
          <p class="text-gray-500 text-sm">
            {{ props.state.message.value }}
          </p>
        </div>
        <div class="flex justify-end space-x-3 mt-6">
          <Button variant="outline" @click="handleCancel"> Cancel </Button>
          <Button @click="handleConfirm"> Confirm </Button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import Button from '@/components/ui/button/Button.vue'
import type { useWarningModal } from '@/composables/useWarningModal' // Import the type
import { Icon } from '@iconify/vue'

// Define props to accept the modal state
const props = defineProps<{
  state: ReturnType<typeof useWarningModal>
}>()

const handleConfirm = () => {
  props.state.confirm()
}

const handleCancel = () => {
  props.state.cancel()
}
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Optional: Transition for the modal content itself */
.modal-fade-enter-active .bg-white,
.modal-fade-leave-active .bg-white {
  transition: transform 0.3s ease;
}

.modal-fade-enter-from .bg-white,
.modal-fade-leave-to .bg-white {
  transform: scale(0.95);
}
</style>
