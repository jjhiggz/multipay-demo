import { ref, readonly } from 'vue'

// This structure remains a singleton internally for the global modal behavior.
const isVisible = ref(false)
const title = ref('')
const message = ref('')
let currentPromiseResolve: ((value: { accepted: boolean }) => void) | null =
  null

export const useWarningModal = () => {
  const open = (options: {
    title: string
    message: string
  }): Promise<{ accepted: boolean }> => {
    title.value = options.title
    message.value = options.message
    isVisible.value = true
    return new Promise((resolve) => {
      currentPromiseResolve = resolve
    })
  }

  const confirm = () => {
    isVisible.value = false
    if (currentPromiseResolve) {
      currentPromiseResolve({ accepted: true })
      currentPromiseResolve = null // Clear after resolving
    }
  }

  const cancel = () => {
    isVisible.value = false
    if (currentPromiseResolve) {
      currentPromiseResolve({ accepted: false })
      currentPromiseResolve = null // Clear after resolving
    }
  }

  return {
    isVisible: readonly(isVisible), // Expose as readonly to encourage mutation via methods
    title: readonly(title),
    message: readonly(message),
    open,
    confirm,
    cancel,
  }
}
