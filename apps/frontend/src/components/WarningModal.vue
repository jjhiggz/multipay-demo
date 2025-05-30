<template>
  <Transition name="modal-fade">
    <div
      v-if="props.state.isVisible.value"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div class="bg-white shadow-xl m-4 p-6 rounded-3xl w-full max-w-md">
        <!-- Icon in circle -->
        <div class="flex justify-center mb-4">
          <div class="bg-gray-100 rounded-full p-4 w-14 h-14 flex items-center justify-center">
            <Icon
              v-if="props.state.icon.value === 'warning'"
              icon="carbon:warning-filled"
              class="text-gray-500 text-2xl"
            />
          </div>
        </div>
        
        <!-- Title -->
        <div class="text-center mb-2 mt-3 pb-2">
          <h3 class="font-bold text-gray-700 text-lg leading-6">
            {{ props.state.title.value }}
          </h3>
        </div>
        
        <!-- Message -->
        <div class="text-center mb-6">
          <p class="text-gray-500 text-sm">
            {{ props.state.message.value }}
          </p>
        </div>
        
        <!-- Full width buttons side by side -->
        <div class="grid grid-cols-2 gap-3">
          <Button variant="outline" @click="handleCancel" class="w-full"> 
            Cancel 
          </Button>
          <Button @click="handleConfirm" class="w-full"> 
            Confirm 
          </Button>
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
