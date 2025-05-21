import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest'
import { useElementWidth } from '../useElementWidth'
import type { VNodeRef } from 'vue'

// Adjusted to match actual ResizeObserverCallback signature
type ResizeCallback = (
  entries: ResizeObserverEntry[],
  observer: ResizeObserver,
) => void

// Helper to create a new ResizeObserver mock instance for clarity
const createResizeObserverMock = () => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
})

// Global mock that will be spied on and potentially replaced by individual tests
let globalResizeObserverMockInstance = createResizeObserverMock()
global.ResizeObserver = vi
  .fn()
  .mockImplementation(() => globalResizeObserverMockInstance)

describe('useElementWidth', () => {
  beforeEach(() => {
    // Reset the global mock instance's methods
    globalResizeObserverMockInstance.observe.mockClear()
    globalResizeObserverMockInstance.unobserve.mockClear()
    globalResizeObserverMockInstance.disconnect.mockClear()

    // Clear any specific implementations on the spy and reset its call history
    vi.spyOn(global, 'ResizeObserver').mockClear()

    // Ensure global.ResizeObserver is reset to the default factory after spy clears/resets
    globalResizeObserverMockInstance = createResizeObserverMock()
    global.ResizeObserver = vi
      .fn()
      .mockImplementation(() => globalResizeObserverMockInstance)
  })

  it('should return 0 for a null target', () => {
    const target = ref<VNodeRef | null>(null)
    const width = useElementWidth(target)
    expect(width.value).toBe(0)
  })

  it.skip('should initialize with elements offsetWidth and observe it', async () => {
    const mockElement = document.createElement('div') as unknown as VNodeRef
    Object.defineProperty(mockElement, 'offsetWidth', {
      configurable: true,
      value: 100,
    })
    const target = ref<VNodeRef | null>(mockElement)

    const TestComponent = {
      template: '<div ref="el"></div>',
      setup() {
        const width = useElementWidth(target)
        return { width, el: target }
      },
    }
    const wrapper = mount(TestComponent)
    await wrapper.vm.$nextTick() // Wait for onMounted and reactive updates

    expect(global.ResizeObserver).toHaveBeenCalledTimes(1)
    expect(globalResizeObserverMockInstance.observe).toHaveBeenCalledWith(
      mockElement,
    )
    expect(wrapper.vm.width).toBe(100)
  })

  it('should update width when ResizeObserver callback is triggered', async () => {
    const mockElement = document.createElement('div') as unknown as VNodeRef
    Object.defineProperty(mockElement, 'offsetWidth', {
      configurable: true,
      value: 150,
    })
    const target = ref<VNodeRef | null>(mockElement)

    let capturedResizeCallback: ResizeCallback | undefined

    // Create a fresh mock instance for this test's ResizeObserver
    const specificTestObserverMock = createResizeObserverMock()

    vi.spyOn(global, 'ResizeObserver').mockImplementationOnce(
      (cb: ResizeCallback) => {
        capturedResizeCallback = cb // Capture the callback
        return specificTestObserverMock as any as ResizeObserver // Cast to satisfy return type
      },
    )

    const TestComponent = {
      template: '<div></div>',
      setup() {
        const width = useElementWidth(target)
        return { width }
      },
    }
    const wrapper = mount(TestComponent)
    await wrapper.vm.$nextTick() // Allow onMounted to run

    expect(wrapper.vm.width).toBe(150) // Initial width

    Object.defineProperty(mockElement, 'offsetWidth', {
      configurable: true,
      value: 200,
    })

    expect(capturedResizeCallback).toBeDefined()
    if (capturedResizeCallback) {
      // Call with mock args matching the expected signature
      capturedResizeCallback(
        [],
        specificTestObserverMock as any as ResizeObserver,
      )
    }
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.width).toBe(200)
    // Check that the specific mock for this test was used for observation
    expect(specificTestObserverMock.observe).toHaveBeenCalledWith(mockElement)
  })

  it('should stop observing when target becomes null', async () => {
    const mockElement = document.createElement('div') as unknown as VNodeRef
    Object.defineProperty(mockElement, 'offsetWidth', {
      configurable: true,
      value: 120,
    })
    const target = ref<VNodeRef | null>(mockElement)

    const TestComponent = {
      template: '<div></div>',
      setup() {
        const width = useElementWidth(target)
        return { width }
      },
    }
    const wrapper = mount(TestComponent)
    await wrapper.vm.$nextTick()

    expect(globalResizeObserverMockInstance.observe).toHaveBeenCalledWith(
      mockElement,
    )
    expect(wrapper.vm.width).toBe(120)

    target.value = null
    await wrapper.vm.$nextTick()

    expect(globalResizeObserverMockInstance.unobserve).toHaveBeenCalledWith(
      mockElement,
    )
    expect(globalResizeObserverMockInstance.disconnect).toHaveBeenCalledTimes(1)
    expect(wrapper.vm.width).toBe(0)
  })

  it('should clean up on unmount', async () => {
    const mockElement = document.createElement('div') as unknown as VNodeRef
    Object.defineProperty(mockElement, 'offsetWidth', {
      configurable: true,
      value: 130,
    })
    const target = ref<VNodeRef | null>(mockElement)

    const TestComponent = {
      template: '<div></div>',
      setup() {
        const width = useElementWidth(target)
        return { width }
      },
    }
    const wrapper = mount(TestComponent)
    await wrapper.vm.$nextTick()
    expect(globalResizeObserverMockInstance.observe).toHaveBeenCalledWith(
      mockElement,
    )

    wrapper.unmount()

    expect(globalResizeObserverMockInstance.unobserve).toHaveBeenCalledWith(
      mockElement,
    )
    expect(globalResizeObserverMockInstance.disconnect).toHaveBeenCalledTimes(1)
  })

  it('should switch observation when target element changes', async () => {
    const initialMockElement = document.createElement(
      'div',
    ) as unknown as VNodeRef
    Object.defineProperty(initialMockElement, 'offsetWidth', {
      configurable: true,
      value: 100,
    })
    const newMockElement = document.createElement('div') as unknown as VNodeRef
    Object.defineProperty(newMockElement, 'offsetWidth', {
      configurable: true,
      value: 200,
    })

    const target = ref<VNodeRef | null>(initialMockElement)

    // For this test, we want to track calls on two distinct observer instances
    const initialObserverInstanceMocks = createResizeObserverMock()
    const newObserverInstanceMocks = createResizeObserverMock()

    const resizeObserverSpy = vi.spyOn(global, 'ResizeObserver')
    resizeObserverSpy.mockImplementationOnce(
      () => initialObserverInstanceMocks as any as ResizeObserver,
    )

    const TestComponent = {
      template: '<div></div>',
      setup() {
        const width = useElementWidth(target)
        return { width }
      },
    }
    const wrapper = mount(TestComponent)
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.width).toBe(100)
    expect(initialObserverInstanceMocks.observe).toHaveBeenCalledWith(
      initialMockElement,
    )
    expect(initialObserverInstanceMocks.observe).toHaveBeenCalledTimes(1)

    // Set up the spy for the *next* ResizeObserver creation
    resizeObserverSpy.mockImplementationOnce(
      () => newObserverInstanceMocks as any as ResizeObserver,
    )

    target.value = newMockElement
    await wrapper.vm.$nextTick()

    expect(initialObserverInstanceMocks.unobserve).toHaveBeenCalledWith(
      initialMockElement,
    )
    expect(initialObserverInstanceMocks.disconnect).toHaveBeenCalledTimes(1)

    expect(global.ResizeObserver).toHaveBeenCalledTimes(2) // Called once for initial, once for new
    expect(newObserverInstanceMocks.observe).toHaveBeenCalledWith(
      newMockElement,
    )
    expect(newObserverInstanceMocks.observe).toHaveBeenCalledTimes(1)

    expect(wrapper.vm.width).toBe(200)
  })

  it('should handle direct HTMLElement target (not a Ref)', async () => {
    const mockElement = document.createElement('div') as unknown as VNodeRef
    Object.defineProperty(mockElement, 'offsetWidth', {
      configurable: true,
      value: 250,
    })

    const TestComponent = {
      template: '<div></div>',
      setup() {
        const width = useElementWidth(mockElement)
        return { width }
      },
    }
    const wrapper = mount(TestComponent)
    await wrapper.vm.$nextTick()

    expect(global.ResizeObserver).toHaveBeenCalledTimes(1)
    expect(globalResizeObserverMockInstance.observe).toHaveBeenCalledWith(
      mockElement,
    )
    expect(wrapper.vm.width).toBe(250)

    wrapper.unmount()
    expect(globalResizeObserverMockInstance.unobserve).toHaveBeenCalledWith(
      mockElement,
    )
    expect(globalResizeObserverMockInstance.disconnect).toHaveBeenCalledTimes(1)
  })
})
