import { ref, readonly } from 'vue'

// This structure remains a singleton internally for the global modal behavior.
const isVisible = ref(false)
const title = ref('')
const message = ref('')
const icon = ref<string | null>(null)
let currentPromiseResolve: ((value: { accepted: boolean }) => void) | null =
  null

export const useWarningModal = () => {
  const open = (options: {
    title: string
    message: string
    icon?: string
  }): Promise<{ accepted: boolean }> => {
    title.value = options.title
    message.value = options.message
    icon.value = options.icon || null
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
    icon: readonly(icon),
    open,
    confirm,
    cancel,
  }
}
