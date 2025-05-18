<template>
  <div class="mx-auto px-4 py-10 container">
    <h1 class="mb-6 font-bold text-3xl">Money Transfer</h1>
    <div class="flex flex-col min-h-[calc(100vh-8rem)]">
      <Card class="flex-grow w-full">
        <CardHeader class="pb-3">
          <div class="hidden md:flex justify-between items-center">
            <div class="flex md:flex-row flex-col md:items-end gap-6">
              <div class="space-y-2">
                <label class="font-medium text-sm leading-none" for="sending-currency-desktop"
                  >Sending Currency</label
                >
                <Combobox class="w-[180px]" />
              </div>
              <div class="space-y-2">
                <label class="font-medium text-sm leading-none" for="receiving-currency-desktop"
                  >Receiving Currency</label
                >
                <Combobox class="w-[180px]" />
              </div>
            </div>
            <Button
              variant="secondary"
              class="bg-gray-200 hover:bg-gray-300 px-4 py-2 h-10 text-gray-800"
            >
              <span class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="mr-2 w-4 h-4 lucide lucide-plus"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
                Add Recipient
              </span>
            </Button>
          </div>
          <div class="md:hidden">
            <div class="flex justify-between items-center mb-4">
              <div class="flex space-x-2">
                <div>
                  <label class="block mb-1 font-medium text-xs" for="sending-currency-mobile"
                    >From</label
                  >
                  <Combobox class="w-[90px]" />
                </div>
                <div>
                  <label class="block mb-1 font-medium text-xs" for="receiving-currency-mobile"
                    >To</label
                  >
                  <Combobox class="w-[90px]" />
                </div>
              </div>
              <Button
                variant="secondary"
                class="bg-gray-200 hover:bg-gray-300 px-4 py-2 h-10 text-gray-800"
              >
                <span class="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="mr-2 w-4 h-4 lucide lucide-plus"
                  >
                    <path d="M5 12h14"></path>
                    <path d="M12 5v14"></path>
                  </svg>
                  Add
                </span>
              </Button>
            </div>
          </div>
          <div class="flex items-center space-x-2 mt-4">
            <Switch id="currency-mode" />
            <label class="font-medium text-sm" for="currency-mode"
              >Enter amounts in sending currency</label
            >
          </div>
        </CardHeader>
        <CardContent>
          <div class="hidden md:block border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead class="w-[80px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Combobox class="w-full h-8" />
                  </TableCell>
                  <TableCell>
                    <div class="relative">
                      <input
                        type="text"
                        class="flex px-3 py-2 pr-12 border rounded-md w-full h-8 text-base text-right"
                        value="100.00"
                      />
                      <div
                        class="right-0 absolute inset-y-0 flex items-center pr-3 text-muted-foreground pointer-events-none"
                      >
                        USD
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Combobox class="w-full h-8" />
                  </TableCell>
                  <TableCell>
                    <input
                      class="flex px-3 py-2 border rounded-md w-full h-8 text-base"
                      placeholder="Optional reference"
                      value=""
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      class="hover:bg-accent p-0 w-10 h-10 hover:text-accent-foreground"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="w-4 h-4 text-destructive lucide lucide-trash2"
                      >
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        <line x1="10" x2="10" y1="11" y2="17"></line>
                        <line x1="14" x2="14" y1="11" y2="17"></line>
                      </svg>
                      <span class="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
                <!-- Repeat TableRow for more recipients as needed -->
              </TableBody>
            </Table>
          </div>
          <!-- Mobile cards -->
          <div class="md:hidden space-y-2">
            <Card class="overflow-hidden">
              <div class="flex justify-between items-center p-4 cursor-pointer">
                <div class="font-medium">John Doe</div>
                <div class="flex items-center">
                  <div class="mr-2 font-medium">$100.00 USD</div>
                  <Button variant="ghost" class="p-0 w-8 h-8">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="w-4 h-4 lucide lucide-chevron-down"
                    >
                      <path d="m6 9 6 6 6-6"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            </Card>
            <!-- Repeat Card for more recipients as needed -->
          </div>
        </CardContent>
        <CardFooter class="bottom-0 z-10 sticky bg-card shadow-lg mt-4 border-t w-full">
          <div class="hidden gap-4 md:grid grid-cols-5 w-full">
            <div>
              <div class="text-muted-foreground text-sm">Total to send</div>
              <div class="font-bold text-xl">$1,500.00 USD</div>
            </div>
            <div>
              <div class="text-muted-foreground text-sm">Exchange rate</div>
              <div class="font-medium text-lg">1 USD = 0.92 EUR</div>
            </div>
            <div>
              <div class="text-muted-foreground text-sm">Recipients will receive</div>
              <div class="font-bold text-xl">€1,380.00 EUR</div>
            </div>
            <div>
              <div class="text-muted-foreground text-sm">Total to pay</div>
              <div class="font-bold text-xl">$1,515.00 USD</div>
              <div class="mt-1 text-muted-foreground text-sm">Includes fee: $15.00 USD</div>
            </div>
            <div class="flex justify-center items-center">
              <Button
                class="bg-primary hover:bg-primary/90 px-8 rounded-md w-full h-11 text-primary-foreground"
              >
                Continue
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide-arrow-right ml-2 w-4 h-4 lucide"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Button>
            </div>
          </div>
          <!-- Mobile summary -->
          <div class="md:hidden flex flex-col space-y-3 w-full">
            <div class="flex justify-between items-center">
              <div class="text-muted-foreground text-sm">Total to send</div>
              <div class="font-medium text-sm">$1,500.00 USD</div>
            </div>
            <div class="flex justify-between items-center">
              <div class="text-muted-foreground text-sm">Exchange rate</div>
              <div class="font-medium text-sm">1 USD = 0.92 EUR</div>
            </div>
            <div class="flex justify-between items-center">
              <div class="text-muted-foreground text-sm">Recipients will receive</div>
              <div class="font-medium text-sm">€1,380.00 EUR</div>
            </div>
            <div class="flex justify-between items-center">
              <div class="text-muted-foreground text-sm">Total to pay</div>
              <div class="font-medium text-sm">$1,515.00 USD</div>
            </div>
            <div class="flex justify-between items-center mt-1">
              <div class="text-muted-foreground text-xs">Includes fee:</div>
              <div class="text-muted-foreground text-xs">$15.00 USD</div>
            </div>
            <Button
              class="bg-primary hover:bg-primary/90 mt-2 px-8 rounded-md w-full h-11 text-primary-foreground"
            >
              Continue
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide-arrow-right ml-2 w-4 h-4 lucide"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from '@/components/ui/card'
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Combobox } from '@/components/ui/combobox'
</script>
