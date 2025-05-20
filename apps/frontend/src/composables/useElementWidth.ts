import {
  ref,
  watch,
  onMounted,
  onBeforeUnmount,
  type Ref,
  shallowRef,
  type VNodeRef,
  toValue,
  type ComponentPublicInstance,
} from 'vue'

export function useElementWidth(
  target: Ref<VNodeRef | null> | VNodeRef | null | undefined,
) {
  const width = ref(0)
  const observer = shallowRef<ResizeObserver | null>(null)

  const getElement = (): HTMLElement | null => {
    let resolvedTarget = toValue(target)

    // If resolvedTarget is a Ref object itself (e.g., target was Ref<Ref<Element/Component>>)
    if (
      resolvedTarget &&
      typeof resolvedTarget === 'object' &&
      'value' in resolvedTarget
    ) {
      resolvedTarget = toValue(resolvedTarget) // Unwrap it further
    }

    if (resolvedTarget instanceof HTMLElement) {
      return resolvedTarget
    }
    // Check if it's a component instance with an $el property
    if (
      resolvedTarget &&
      typeof resolvedTarget === 'object' &&
      resolvedTarget !== null &&
      '$el' in resolvedTarget
    ) {
      const elProp = (resolvedTarget as ComponentPublicInstance).$el
      if (elProp instanceof HTMLElement) {
        return elProp
      }
    }
    return null
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
