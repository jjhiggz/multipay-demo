"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CurrencyInput } from "@/components/currency-input"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Card, CardContent } from "@/components/ui/card"
import type { TransferRow } from "@/components/money-transfer-table"
import { recipients } from "@/data/recipients"
import { transferReasons } from "@/data/transfer-reasons"

interface TransferTableProps {
  rows: TransferRow[]
  updateRow: (id: string, field: keyof TransferRow, value: any) => void
  deleteRow: (id: string) => void
  isReceivingMode: boolean
  sendingCurrency: string
  receivingCurrency: string
}

export function TransferTable({
  rows,
  updateRow,
  deleteRow,
  isReceivingMode,
  sendingCurrency,
  receivingCurrency,
}: TransferTableProps) {
  const currency = isReceivingMode ? receivingCurrency : sendingCurrency
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({})

  const toggleItem = (id: string) => {
    setOpenItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Format currency without the currency symbol
  const formatAmountWithoutSymbol = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  // Get currency symbol
  const getCurrencySymbol = (currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    })
      .format(0)
      .replace(/[0-9.,]/g, "")
      .trim()
  }

  return (
    <>
      {/* Desktop view */}
      <div className="rounded-md border hidden md:block">
        <Table className="[&_tr]:h-10 [&_td]:py-1">
          <TableHeader className="[&_tr]:h-9">
            <TableRow>
              <TableHead>Recipient</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Reference</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No recipients added.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id} className="h-10">
                  <TableCell>
                    <Select
                      value={row.recipient.id}
                      onValueChange={(value) => {
                        const selectedRecipient = recipients.find((r) => r.id === value)
                        if (selectedRecipient) {
                          updateRow(row.id, "recipient", selectedRecipient)
                        }
                      }}
                    >
                      <SelectTrigger className="w-full h-8">
                        <SelectValue>{row.recipient.name}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {recipients.map((recipient) => (
                          <SelectItem key={recipient.id} value={recipient.id}>
                            {recipient.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <CurrencyInput
                      value={row.amount}
                      onChange={(value) => updateRow(row.id, "amount", value)}
                      currency={currency}
                      className="h-8"
                    />
                  </TableCell>
                  <TableCell>
                    <Select value={row.reason} onValueChange={(value) => updateRow(row.id, "reason", value)}>
                      <SelectTrigger className="w-full h-8">
                        <SelectValue>{row.reason}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {transferReasons.map((reason) => (
                          <SelectItem key={reason} value={reason}>
                            {reason}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      value={row.reference || ""}
                      onChange={(e) => updateRow(row.id, "reference", e.target.value)}
                      className="w-full h-8"
                      placeholder="Optional reference"
                    />
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => deleteRow(row.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view with collapsible rows */}
      <div className="space-y-2 md:hidden">
        {rows.length === 0 ? (
          <div className="text-center py-8 border rounded-md">No recipients added.</div>
        ) : (
          rows.map((row) => (
            <Card key={row.id} className="overflow-hidden">
              <Collapsible open={openItems[row.id]} onOpenChange={() => toggleItem(row.id)}>
                <div
                  className="flex items-center justify-between p-4 cursor-pointer"
                  onClick={() => toggleItem(row.id)}
                >
                  <div className="font-medium">{row.recipient.name}</div>
                  <div className="flex items-center">
                    <div className="font-medium mr-2">
                      {getCurrencySymbol(currency)}
                      {formatAmountWithoutSymbol(row.amount)} {currency}
                    </div>
                    <CollapsibleTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        {openItems[row.id] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </Button>
                    </CollapsibleTrigger>
                  </div>
                </div>
                <CollapsibleContent>
                  <CardContent className="pt-0 pb-4 px-4 space-y-3">
                    <div className="space-y-1">
                      <Label htmlFor={`recipient-${row.id}`} className="text-xs text-muted-foreground">
                        Recipient
                      </Label>
                      <Select
                        value={row.recipient.id}
                        onValueChange={(value) => {
                          const selectedRecipient = recipients.find((r) => r.id === value)
                          if (selectedRecipient) {
                            updateRow(row.id, "recipient", selectedRecipient)
                          }
                        }}
                      >
                        <SelectTrigger id={`recipient-${row.id}`} className="w-full">
                          <SelectValue>{row.recipient.name}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {recipients.map((recipient) => (
                            <SelectItem key={recipient.id} value={recipient.id}>
                              {recipient.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor={`amount-${row.id}`} className="text-xs text-muted-foreground">
                        Amount
                      </Label>
                      <CurrencyInput
                        value={row.amount}
                        onChange={(value) => updateRow(row.id, "amount", value)}
                        currency={currency}
                      />
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor={`reason-${row.id}`} className="text-xs text-muted-foreground">
                        Reason
                      </Label>
                      <Select value={row.reason} onValueChange={(value) => updateRow(row.id, "reason", value)}>
                        <SelectTrigger id={`reason-${row.id}`} className="w-full">
                          <SelectValue>{row.reason}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          {transferReasons.map((reason) => (
                            <SelectItem key={reason} value={reason}>
                              {reason}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor={`reference-${row.id}`} className="text-xs text-muted-foreground">
                        Reference (Optional)
                      </Label>
                      <Input
                        id={`reference-${row.id}`}
                        value={row.reference || ""}
                        onChange={(e) => updateRow(row.id, "reference", e.target.value)}
                        placeholder="Add a reference"
                      />
                    </div>

                    <div className="pt-2">
                      <Button variant="destructive" size="sm" className="w-full" onClick={() => deleteRow(row.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove Recipient
                      </Button>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          ))
        )}
      </div>
    </>
  )
}
