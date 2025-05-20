import { ref, watch, onMounted, onBeforeUnmount, type Ref } from 'vue'

export function useElementWidth(
  target: Ref<HTMLElement | null> | HTMLElement | null | undefined,
) {
  const width = ref(0)
  let observer: ResizeObserver | null = null

  const getElement = () => {
    if (target && typeof target === 'object' && 'value' in target) {
      return target.value
    }
    return target ?? null
  }

  const updateWidth = () => {
    const el = getElement()
    width.value = el ? el.offsetWidth : 0
  }

  onMounted(() => {
    const el = getElement()
    console.log({ el })
    if (el) {
      observer = new ResizeObserver(() => updateWidth())
      observer.observe(el)
      updateWidth()
    }
  })

  watch(
    () => getElement(),
    (el, oldEl) => {
      if (observer && oldEl) observer.unobserve(oldEl as HTMLElement)
      if (el) {
        if (!observer) observer = new ResizeObserver(() => updateWidth())
        observer.observe(el as HTMLElement)
        updateWidth()
      }
    },
    { immediate: true },
  )

  onBeforeUnmount(() => {
    const el = getElement()
    if (observer && el) observer.unobserve(el)
    observer = null
  })

  return width
}
