import {
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  type Ref,
  shallowRef,
} from 'vue'

export function useElementWidth(
  target: Ref<HTMLElement | null> | HTMLElement | null | undefined,
) {
  const width = ref(0)
  const observer = shallowRef<ResizeObserver | null>(null)

  const getElement = (): HTMLElement | null => {
    if (target && typeof target === 'object' && 'value' in target) {
      return target.value
    }
    return (target as HTMLElement) ?? null
  }

  const updateWidth = (element: HTMLElement | null) => {
    width.value = element ? element.offsetWidth : 0
  }

  const stopObserver = (obs: ResizeObserver | null, el: HTMLElement | null) => {
    if (obs && el) {
      obs.unobserve(el)
    }
    if (obs) {
      obs.disconnect()
    }
  }

  onMounted(() => {
    const el = getElement()
    if (el) {
      if (observer.value) {
        stopObserver(observer.value, el)
      }
      observer.value = new ResizeObserver(() => updateWidth(el))
      observer.value.observe(el)
      updateWidth(el)
    }
  })

  watch(
    () => getElement(),
    (newEl, oldEl) => {
      if (newEl === oldEl && observer.value) {
        return
      }

      if (observer.value) {
        stopObserver(observer.value, oldEl)
        observer.value = null
      }

      if (newEl) {
        observer.value = new ResizeObserver(() => updateWidth(newEl))
        observer.value.observe(newEl)
        updateWidth(newEl)
      } else {
        updateWidth(null)
      }
    },
  )

  onBeforeUnmount(() => {
    stopObserver(observer.value, getElement())
    observer.value = null
  })

  return width
}
