"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { TransferTable } from "@/components/transfer-table"
import { AddRecipientModal } from "@/components/add-recipient-modal"
import { TransferSummary } from "@/components/transfer-summary"
import { initialRecipients } from "@/data/recipients"
import { currencies } from "@/data/currencies"

export type Recipient = {
  id: string
  name: string
  email: string
  accountId?: string
}

export type TransferRow = {
  id: string
  recipient: Recipient
  amount: number
  currency: string
  reason: string
  reference?: string
}

export function MoneyTransferTable() {
  const [sendingCurrency, setSendingCurrency] = useState("USD")
  const [receivingCurrency, setReceivingCurrency] = useState("EUR")
  const [isReceivingMode, setIsReceivingMode] = useState(false)
  const [rows, setRows] = useState<TransferRow[]>(
    initialRecipients.map((recipient, index) => ({
      id: `row-${index}`,
      recipient,
      amount: 100 * (index + 1), // Sample amounts for demonstration
      currency: receivingCurrency,
      reason: "Payment",
      reference: "",
    })),
  )
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Mock exchange rate for demonstration
  const exchangeRate = 0.92 // 1 USD = 0.92 EUR

  const addRecipient = (newRecipient: Omit<TransferRow, "id" | "currency" | "amount">) => {
    const newId = `row-${rows.length}`
    setRows([
      ...rows,
      {
        id: newId,
        ...newRecipient,
        amount: 0, // Default amount
        currency: isReceivingMode ? receivingCurrency : sendingCurrency,
      },
    ])
    setIsAddModalOpen(false)
  }

  const deleteRow = (id: string) => {
    setRows(rows.filter((row) => row.id !== id))
  }

  const updateRow = (id: string, field: keyof TransferRow, value: any) => {
    setRows(
      rows.map((row) => {
        if (row.id === id) {
          return { ...row, [field]: value }
        }
        return row
      }),
    )
  }

  const toggleCurrencyMode = (checked: boolean) => {
    setIsReceivingMode(checked)

    // Update all rows to use the appropriate currency based on the mode
    setRows(
      rows.map((row) => ({
        ...row,
        currency: checked ? receivingCurrency : sendingCurrency,
      })),
    )
  }

  // Calculate totals
  const totalSendingAmount = rows.reduce((sum, row) => {
    if (isReceivingMode) {
      // Convert from receiving to sending currency
      return sum + row.amount / exchangeRate
    }
    return sum + row.amount
  }, 0)

  const totalReceivingAmount = rows.reduce((sum, row) => {
    if (isReceivingMode) {
      return sum + row.amount
    }
    // Convert from sending to receiving currency
    return sum + row.amount * exchangeRate
  }, 0)

  const currency = isReceivingMode ? receivingCurrency : sendingCurrency

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      <Card className="w-full flex-grow">
        <CardHeader className="pb-3">
          {/* Desktop view */}
          <div className="hidden md:flex justify-between items-center">
            <div className="flex flex-col gap-6 md:flex-row md:items-end">
              <div className="space-y-2">
                <Label htmlFor="sending-currency-desktop">Sending Currency</Label>
                <Select value={sendingCurrency} onValueChange={setSendingCurrency}>
                  <SelectTrigger id="sending-currency-desktop" className="w-[180px]">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="receiving-currency-desktop">Receiving Currency</Label>
                <Select value={receivingCurrency} onValueChange={setReceivingCurrency}>
                  <SelectTrigger id="receiving-currency-desktop" className="w-[180px]">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.code} - {currency.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={() => setIsAddModalOpen(true)} className="bg-gray-200 hover:bg-gray-300 text-gray-800">
              <Plus className="mr-2 h-4 w-4" />
              Add Recipient
            </Button>
          </div>

          {/* Mobile view - currencies in same row */}
          <div className="md:hidden">
            <div className="flex justify-between items-center mb-4">
              <div className="flex space-x-2">
                <div>
                  <Label htmlFor="sending-currency-mobile" className="text-xs block mb-1">
                    From
                  </Label>
                  <Select value={sendingCurrency} onValueChange={setSendingCurrency}>
                    <SelectTrigger id="sending-currency-mobile" className="w-[90px]">
                      <SelectValue placeholder="From" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="receiving-currency-mobile" className="text-xs block mb-1">
                    To
                  </Label>
                  <Select value={receivingCurrency} onValueChange={setReceivingCurrency}>
                    <SelectTrigger id="receiving-currency-mobile" className="w-[90px]">
                      <SelectValue placeholder="To" />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          {currency.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={() => setIsAddModalOpen(true)} className="bg-gray-200 hover:bg-gray-300 text-gray-800">
                <Plus className="mr-2 h-4 w-4" />
                Add
              </Button>
            </div>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <Switch id="currency-mode" checked={isReceivingMode} onCheckedChange={toggleCurrencyMode} />
            <Label htmlFor="currency-mode" className="text-sm">
              {isReceivingMode ? "Enter amounts in receiving currency" : "Enter amounts in sending currency"}
            </Label>
          </div>
        </CardHeader>
        <CardContent>
          <TransferTable
            rows={rows}
            updateRow={updateRow}
            deleteRow={deleteRow}
            isReceivingMode={isReceivingMode}
            sendingCurrency={sendingCurrency}
            receivingCurrency={receivingCurrency}
          />
        </CardContent>
      </Card>

      <TransferSummary
        totalSendingAmount={totalSendingAmount}
        totalReceivingAmount={totalReceivingAmount}
        sendingCurrency={sendingCurrency}
        receivingCurrency={receivingCurrency}
        exchangeRate={exchangeRate}
      />

      <AddRecipientModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
        onAdd={addRecipient}
        receivingCurrency={receivingCurrency}
      />
    </div>
  )
}
