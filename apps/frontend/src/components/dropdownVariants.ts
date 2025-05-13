// Variant utility for Dropdown.vue (shadcn/ui style, functional)

const baseDropdown = 'relative inline-block'
const baseTrigger =
  'inline-flex items-center justify-between px-3 py-2 rounded-md border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors'
const baseMenu =
  'absolute z-50 mt-2 w-full min-w-[8rem] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
const baseItem =
  'block w-full text-left px-4 py-2 text-sm cursor-pointer select-none transition-colors'

const variantMap = {
  default: {
    trigger: 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50',
    menu: '',
    item: 'text-gray-900 hover:bg-gray-100',
    itemSelected: 'bg-gray-100 font-semibold',
    dropdown: '',
  },
  ghost: {
    trigger: 'bg-transparent border-transparent text-gray-900 hover:bg-gray-100',
    menu: '',
    item: 'text-gray-900 hover:bg-gray-100',
    itemSelected: 'bg-gray-200 font-semibold',
    dropdown: '',
  },
  outline: {
    trigger: 'bg-white border border-gray-400 text-gray-900 hover:bg-gray-50',
    menu: '',
    item: 'text-gray-900 hover:bg-gray-100',
    itemSelected: 'bg-gray-100 font-semibold',
    dropdown: '',
  },
  destructive: {
    trigger: 'bg-white border-gray-300 text-red-600 hover:bg-red-50',
    menu: '',
    item: 'text-red-600 hover:bg-red-100',
    itemSelected: 'bg-red-100 font-semibold',
    dropdown: '',
  },
}

const getVariant = (variant?: string) =>
  variantMap[variant as keyof typeof variantMap] || variantMap.default

export const dropdownVariants = (variant?: string) =>
  [baseDropdown, getVariant(variant).dropdown].join(' ')
export const triggerVariants = (variant?: string) =>
  [baseTrigger, getVariant(variant).trigger].join(' ')
export const menuVariants = (variant?: string) => [baseMenu, getVariant(variant).menu].join(' ')
export const itemVariants = (variant?: string, selected?: boolean) =>
  [baseItem, getVariant(variant).item, selected ? getVariant(variant).itemSelected : ''].join(' ')
