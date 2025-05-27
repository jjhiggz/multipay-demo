<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <!-- Header Section -->
    <header class="max-w-7xl mx-auto mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Tailwind CSS Kitchen Sink</h1>
      <p class="text-lg text-gray-600">A comprehensive, detailed showcase of Tailwind CSS utilities and components</p>
    </header>

    <main class="max-w-7xl mx-auto space-y-12">
      <!-- Typography Section -->
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Typography</h2>
        <div class="space-y-2">
          <h1 class="text-5xl font-extrabold">Heading 1 (5xl, extrabold)</h1>
          <h2 class="text-4xl font-bold">Heading 2 (4xl, bold)</h2>
          <h3 class="text-3xl font-semibold">Heading 3 (3xl, semibold)</h3>
          <h4 class="text-2xl font-medium">Heading 4 (2xl, medium)</h4>
          <h5 class="text-xl font-normal">Heading 5 (xl, normal)</h5>
          <h6 class="text-lg font-light">Heading 6 (lg, light)</h6>
          <p class="text-base">This is <span class="font-bold">bold</span>, <span class="italic">italic</span>, <span class="underline">underline</span>, <span class="line-through">line-through</span>, <span class="uppercase">uppercase</span>, <span class="lowercase">LOWERCASE</span>, <span class="capitalize">capitalize each word</span>.</p>
          <p class="text-sm text-gray-500">Small text for captions and secondary information.</p>
          <blockquote class="border-l-4 border-blue-500 pl-4 italic text-gray-700">This is a blockquote example.</blockquote>
          <ul class="list-disc list-inside">
            <li>Unordered list item</li>
            <li>Another item</li>
          </ul>
          <ol class="list-decimal list-inside">
            <li>Ordered list item</li>
            <li>Another item</li>
          </ol>
          <pre class="bg-gray-100 p-2 rounded text-xs overflow-x-auto">&lt;pre&gt; code block example &lt;/pre&gt;</pre>
        </div>
      </section>

      <!-- Color Utility Classes Section -->
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Color Utility Classes</h2>
        <p class="mb-6 text-gray-600">All <code>bg-*</code>, <code>text-*</code>, and <code>border-*</code> classes for common color families and shades, with their hex codes.</p>
        <div v-for="color in colorFamilies" :key="color" class="mb-8">
          <h3 class="text-lg font-medium text-gray-800 mb-3 capitalize">{{ color }}</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full text-xs">
              <thead>
                <tr>
                  <th class="px-2 py-1 text-left">Swatch</th>
                  <th class="px-2 py-1 text-left">bg-*</th>
                  <th class="px-2 py-1 text-left">text-*</th>
                  <th class="px-2 py-1 text-left">border-*</th>
                  <th class="px-2 py-1 text-left">Hex</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="shade in colorShades" :key="shade">
                  <td class="px-2 py-1">
                    <span :class="`inline-block w-8 h-5 rounded bg-${color}-${shade} border border-gray-200`"></span>
                  </td>
                  <td class="px-2 py-1 font-mono">bg-{{ color }}-{{ shade }}</td>
                  <td class="px-2 py-1 font-mono">
                    <span :class="`text-${color}-${shade}`">text-{{ color }}-{{ shade }}</span>
                  </td>
                  <td class="px-2 py-1 font-mono">
                    <span :class="`border-2 border-${color}-${shade} px-2 py-0.5 rounded`">border-{{ color }}-{{ shade }}</span>
                  </td>
                  <td class="px-2 py-1 font-mono">
                    <span>{{ getHex(color, shade) || '-' }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Colors Section -->
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Colors</h2>
        
        <!-- Slate Colors -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-800 mb-3">Slate</h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-11 gap-2">
            <div v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]" :key="shade"
              :class="getBgTextClass('slate', shade, 500, 'slate-900')">
              {{ shade }}
            </div>
          </div>
        </div>

        <!-- Gray Colors -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-800 mb-3">Gray</h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-11 gap-2">
            <div v-for="shade in [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]" :key="shade"
              :class="getBgTextClass('gray', shade, 500, 'gray-900')">
              {{ shade }}
            </div>
          </div>
        </div>

        <!-- Primary Colors -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-800 mb-3">Primary Colors</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="color in ['blue', 'red', 'green', 'yellow', 'purple', 'pink', 'indigo', 'teal']" :key="color"
              class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700 capitalize">{{ color }}</h4>
              <div class="grid grid-cols-5 gap-1">
                <div v-for="shade in [400, 500, 600]" :key="shade"
                  :class="getBgTextClass(color, shade, 500, 'white', true)">
                  {{ shade }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Semantic Colors -->
        <div class="mb-8">
          <h3 class="text-lg font-medium text-gray-800 mb-3">Semantic Colors</h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700">Success</h4>
              <div class="h-12 bg-green-500 rounded-lg flex items-center justify-center text-white">Green 500</div>
            </div>
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700">Error</h4>
              <div class="h-12 bg-red-500 rounded-lg flex items-center justify-center text-white">Red 500</div>
            </div>
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700">Warning</h4>
              <div class="h-12 bg-yellow-500 rounded-lg flex items-center justify-center text-white">Yellow 500</div>
            </div>
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700">Info</h4>
              <div class="h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white">Blue 500</div>
            </div>
          </div>
        </div>

        <!-- Text Colors -->
        <div>
          <h3 class="text-lg font-medium text-gray-800 mb-3">Text Colors</h3>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div class="p-4 bg-white border rounded-lg">
              <p class="text-gray-900">text-gray-900</p>
              <p class="text-gray-700">text-gray-700</p>
              <p class="text-gray-500">text-gray-500</p>
              <p class="text-gray-300">text-gray-300</p>
            </div>
            <div class="p-4 bg-gray-900 border rounded-lg">
              <p class="text-white">text-white</p>
              <p class="text-gray-300">text-gray-300</p>
              <p class="text-gray-400">text-gray-400</p>
              <p class="text-gray-500">text-gray-500</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Spacing Section -->
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Spacing (Margin, Padding, Gap)</h2>
        <div class="flex flex-wrap gap-8">
          <div class="bg-blue-100 p-4 m-2 rounded">p-4 m-2</div>
          <div class="bg-green-100 px-8 py-2 mb-4 rounded">px-8 py-2 mb-4</div>
          <div class="flex gap-4">
            <div class="bg-yellow-200 w-8 h-8 rounded"></div>
            <div class="bg-yellow-300 w-8 h-8 rounded"></div>
            <div class="bg-yellow-400 w-8 h-8 rounded"></div>
          </div>
        </div>
      </section>

      <!-- Borders & Radius Section -->
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Borders & Radius</h2>
        <div class="flex flex-wrap gap-8 items-end">
          <div class="border border-gray-400 rounded p-4">border</div>
          <div class="border-2 border-blue-500 rounded-lg p-4">border-2 rounded-lg</div>
          <div class="border-4 border-red-500 rounded-full w-16 h-16 flex items-center justify-center">rounded-full</div>
          <div class="border-dashed border-2 border-green-500 p-4">border-dashed</div>
        </div>
      </section>

      <!-- Shadows & Opacity Section -->
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Shadows & Opacity</h2>
        <div class="flex flex-wrap gap-8 items-end">
          <div class="shadow p-4 bg-white rounded">shadow</div>
          <div class="shadow-md p-4 bg-white rounded">shadow-md</div>
          <div class="shadow-lg p-4 bg-white rounded">shadow-lg</div>
          <div class="bg-blue-500 text-white p-4 rounded opacity-50">opacity-50</div>
        </div>
      </section>

      <!-- Flexbox Section -->
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Flexbox</h2>
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[120px] h-16 bg-purple-200 rounded-lg flex items-center justify-center">flex-1</div>
          <div class="flex-none w-24 h-16 bg-purple-300 rounded-lg flex items-center justify-center">flex-none</div>
          <div class="flex-auto h-16 bg-purple-400 rounded-lg flex items-center justify-center">flex-auto</div>
        </div>
        <div class="flex flex-col sm:flex-row gap-2 mt-4">
          <div class="bg-pink-200 p-2 rounded">Column 1</div>
          <div class="bg-pink-300 p-2 rounded">Column 2</div>
        </div>
        <div class="flex items-center justify-between mt-4 bg-gray-100 p-2 rounded">
          <span>justify-between</span>
          <span>flex row</span>
        </div>
      </section>

      <!-- Grid Section -->
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Grid</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="h-16 bg-indigo-200 rounded-lg flex items-center justify-center">1</div>
          <div class="h-16 bg-indigo-300 rounded-lg flex items-center justify-center">2</div>
          <div class="h-16 bg-indigo-400 rounded-lg flex items-center justify-center">3</div>
          <div class="h-16 bg-indigo-500 rounded-lg flex items-center justify-center text-white">4</div>
        </div>
        <div class="grid grid-cols-3 gap-2 mt-4">
          <div class="col-span-2 bg-green-200 h-12 rounded flex items-center justify-center">col-span-2</div>
          <div class="bg-green-300 h-12 rounded flex items-center justify-center">1</div>
        </div>
      </section>

      <!-- Sizing Section -->
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Sizing</h2>
        <div class="flex flex-wrap gap-8 items-end">
          <div class="w-8 h-8 bg-blue-200 rounded"></div>
          <div class="w-16 h-8 bg-blue-300 rounded"></div>
          <div class="w-32 h-8 bg-blue-400 rounded"></div>
          <div class="w-1/2 h-8 bg-blue-500 rounded text-white flex items-center justify-center">w-1/2</div>
          <div class="aspect-w-16 aspect-h-9 w-32 bg-gray-200 rounded flex items-center justify-center">16:9</div>
        </div>
      </section>

      <!-- Lists & Tables Section -->
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Lists & Tables</h2>
        <ul class="list-disc pl-6 mb-4">
          <li>Disc list item</li>
          <li>Another item</li>
        </ul>
        <ol class="list-decimal pl-6 mb-4">
          <li>Decimal list item</li>
          <li>Another item</li>
        </ol>
        <table class="min-w-full text-sm text-left border">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-2 py-1 border">Header 1</th>
              <th class="px-2 py-1 border">Header 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="px-2 py-1 border">Cell 1</td>
              <td class="px-2 py-1 border">Cell 2</td>
            </tr>
            <tr>
              <td class="px-2 py-1 border">Cell 3</td>
              <td class="px-2 py-1 border">Cell 4</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Buttons & Inputs Section -->
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Buttons & Inputs</h2>
        <div class="flex flex-wrap gap-4 items-end">
          <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-500">Primary</button>
          <button class="px-4 py-2 bg-gray-200 text-gray-900 rounded hover:bg-gray-300">Secondary</button>
          <button class="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50" disabled>Disabled</button>
          <input class="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200" placeholder="Input field" />
        </div>
      </section>

      <!-- Transitions & Animations Section -->
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Transitions & Animations</h2>
        <div class="flex flex-wrap gap-8 items-end">
          <button class="transition-colors duration-300 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">Hover me</button>
          <div class="transition-all duration-500 ease-in-out transform hover:scale-110 bg-pink-400 w-16 h-16 rounded"></div>
        </div>
      </section>

      <!-- Responsive Utilities Section -->
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Responsive Utilities</h2>
        <div class="flex flex-col sm:flex-row gap-4">
          <div class="bg-blue-200 p-4 rounded sm:w-1/2">sm:w-1/2</div>
          <div class="bg-blue-300 p-4 rounded hidden sm:block">hidden on mobile</div>
        </div>
      </section>

      <!-- Z-index, Position, Overflow, Misc Section -->
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Z-index, Position, Overflow, Misc</h2>
        <div class="relative h-24 bg-gray-100 rounded mb-4">
          <div class="absolute left-4 top-4 w-16 h-16 bg-red-400 rounded z-10">z-10</div>
          <div class="absolute left-8 top-8 w-16 h-16 bg-blue-400 rounded z-20">z-20</div>
        </div>
        <div class="flex gap-4">
          <div class="w-24 h-12 bg-green-200 rounded overflow-hidden">
            <div class="w-48 h-12 bg-green-400">overflow-hidden</div>
          </div>
          <div class="w-24 h-12 bg-yellow-200 rounded overflow-scroll">
            <div class="w-48 h-12 bg-yellow-400">overflow-scroll</div>
          </div>
        </div>
        <div class="divide-y divide-gray-400 mt-4">
          <div>divide-y</div>
          <div>between</div>
          <div>items</div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
function getBgTextClass(
  color: string,
  shade: number,
  threshold = 500,
  lightText = 'white',
  alwaysLight = false
) {
  // alwaysLight: for colors where all shades need white text
  const bg = `bg-${color}-${shade}`
  const text = alwaysLight ? `text-${lightText}` : shade > threshold ? `text-${lightText}` : `text-${color}-900`
  return [
    'h-20',
    'rounded-lg',
    'flex',
    'items-center',
    'justify-center',
    bg,
    text,
    'text-sm',
  ]
}

const colorFamilies = [
  'slate', 'gray', 'zinc', 'neutral', 'stone',
  'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald',
  'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose'
]
const colorShades = [50,100,200,300,400,500,600,700,800,900,950]

// Full Tailwind default color palette for hex codes
const tailwindHex = {
  slate: {50:'#f8fafc',100:'#f1f5f9',200:'#e2e8f0',300:'#cbd5e1',400:'#94a3b8',500:'#64748b',600:'#475569',700:'#334155',800:'#1e293b',900:'#0f172a',950:'#020617'},
  gray: {50:'#f9fafb',100:'#f3f4f6',200:'#e5e7eb',300:'#d1d5db',400:'#9ca3af',500:'#6b7280',600:'#4b5563',700:'#374151',800:'#1f2937',900:'#111827',950:'#030712'},
  zinc: {50:'#fafafa',100:'#f4f4f5',200:'#e4e4e7',300:'#d4d4d8',400:'#a1a1aa',500:'#71717a',600:'#52525b',700:'#3f3f46',800:'#27272a',900:'#18181b',950:'#09090b'},
  neutral: {50:'#fafafa',100:'#f5f5f5',200:'#e5e5e5',300:'#d4d4d4',400:'#a3a3a3',500:'#737373',600:'#525252',700:'#404040',800:'#262626',900:'#171717',950:'#0a0a0a'},
  stone: {50:'#fafaf9',100:'#f5f5f4',200:'#e7e5e4',300:'#d6d3d1',400:'#a8a29e',500:'#78716c',600:'#57534e',700:'#44403c',800:'#292524',900:'#1c1917',950:'#0c0a09'},
  red: {50:'#fef2f2',100:'#fee2e2',200:'#fecaca',300:'#fca5a5',400:'#f87171',500:'#ef4444',600:'#dc2626',700:'#b91c1c',800:'#991b1b',900:'#7f1d1d',950:'#450a0a'},
  orange: {50:'#fff7ed',100:'#ffedd5',200:'#fed7aa',300:'#fdba74',400:'#fb923c',500:'#f97316',600:'#ea580c',700:'#c2410c',800:'#9a3412',900:'#7c2d12',950:'#431407'},
  amber: {50:'#fffbeb',100:'#fef3c7',200:'#fde68a',300:'#fcd34d',400:'#fbbf24',500:'#f59e42',600:'#d97706',700:'#b45309',800:'#92400e',900:'#78350f',950:'#451a03'},
  yellow: {50:'#fefce8',100:'#fef9c3',200:'#fef08a',300:'#fde047',400:'#facc15',500:'#eab308',600:'#ca8a04',700:'#a16207',800:'#854d0e',900:'#713f12',950:'#422006'},
  lime: {50:'#f7fee7',100:'#ecfccb',200:'#d9f99d',300:'#bef264',400:'#a3e635',500:'#84cc16',600:'#65a30d',700:'#4d7c0f',800:'#3f6212',900:'#365314',950:'#1a2e05'},
  green: {50:'#f0fdf4',100:'#dcfce7',200:'#bbf7d0',300:'#86efac',400:'#4ade80',500:'#22c55e',600:'#16a34a',700:'#15803d',800:'#166534',900:'#14532d',950:'#052e16'},
  emerald: {50:'#ecfdf5',100:'#d1fae5',200:'#a7f3d0',300:'#6ee7b7',400:'#34d399',500:'#10b981',600:'#059669',700:'#047857',800:'#065f46',900:'#064e3b',950:'#022c22'},
  teal: {50:'#f0fdfa',100:'#ccfbf1',200:'#99f6e4',300:'#5eead4',400:'#2dd4bf',500:'#14b8a6',600:'#0d9488',700:'#0f766e',800:'#115e59',900:'#134e4a',950:'#042f2e'},
  cyan: {50:'#ecfeff',100:'#cffafe',200:'#a5f3fc',300:'#67e8f9',400:'#22d3ee',500:'#06b6d4',600:'#0891b2',700:'#0e7490',800:'#155e75',900:'#164e63',950:'#083344'},
  sky: {50:'#f0f9ff',100:'#e0f2fe',200:'#bae6fd',300:'#7dd3fc',400:'#38bdf8',500:'#0ea5e9',600:'#0284c7',700:'#0369a1',800:'#075985',900:'#0c4a6e',950:'#082f49'},
  blue: {
    50: '#E5F0FB',
    100: '#B8DAF6',
    200: '#8AC3F0',
    300: '#5DACEB',
    400: '#2F95E5',
    500: '#006CE0',
    600: '#0057B3',
    700: '#004186',
    800: '#002C59',
    900: '#00162D',
    950: '#00101F',
  },
  indigo: {50:'#eef2ff',100:'#e0e7ff',200:'#c7d2fe',300:'#a5b4fc',400:'#818cf8',500:'#6366f1',600:'#4f46e5',700:'#4338ca',800:'#3730a3',900:'#312e81',950:'#1e1b4b'},
  violet: {50:'#f5f3ff',100:'#ede9fe',200:'#ddd6fe',300:'#c4b5fd',400:'#a78bfa',500:'#8b5cf6',600:'#7c3aed',700:'#6d28d9',800:'#5b21b6',900:'#4c1d95',950:'#2e1065'},
  purple: {50:'#faf5ff',100:'#f3e8ff',200:'#e9d5ff',300:'#d8b4fe',400:'#c084fc',500:'#a855f7',600:'#9333ea',700:'#7e22ce',800:'#6d28d9',900:'#581c87',950:'#3b0764'},
  fuchsia: {50:'#fdf4ff',100:'#fae8ff',200:'#f5d0fe',300:'#f0abfc',400:'#e879f9',500:'#d946ef',600:'#c026d3',700:'#a21caf',800:'#86198f',900:'#701a75',950:'#4a044e'},
  pink: {50:'#fdf2f8',100:'#fce7f3',200:'#fbcfe8',300:'#f9a8d4',400:'#f472b6',500:'#ec4899',600:'#db2777',700:'#be185d',800:'#9d174d',900:'#831843',950:'#500724'},
  rose: {50:'#fff1f2',100:'#ffe4e6',200:'#fecdd3',300:'#fda4af',400:'#fb7185',500:'#f43f5e',600:'#e11d48',700:'#be123c',800:'#9f1239',900:'#881337',950:'#4c0519'},
}

function getHex(color: string, shade: number): string | undefined {
  // @ts-ignore
  return tailwindHex[color]?.[shade]
}
</script>
