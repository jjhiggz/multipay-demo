"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { recipients } from "@/data/recipients"
import { transferReasons } from "@/data/transfer-reasons"
import type { TransferRow } from "@/components/money-transfer-table"

interface AddRecipientModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (recipient: Omit<TransferRow, "id" | "currency" | "amount">) => void
  receivingCurrency: string
}

export function AddRecipientModal({ open, onOpenChange, onAdd, receivingCurrency }: AddRecipientModalProps) {
  const [selectedRecipientId, setSelectedRecipientId] = useState("")
  const [reason, setReason] = useState("Payment")
  const [reference, setReference] = useState("")

  const handleSubmit = () => {
    const selectedRecipient = recipients.find((r) => r.id === selectedRecipientId)
    if (!selectedRecipient) return

    onAdd({
      recipient: selectedRecipient,
      reason,
      reference,
    })

    // Reset form
    setSelectedRecipientId("")
    setReason("Payment")
    setReference("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Recipient</DialogTitle>
          <DialogDescription>Add a new recipient to your money transfer.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="recipient">
              Recipient <span className="text-sm text-muted-foreground">({receivingCurrency} recipients)</span>
            </Label>
            <Select value={selectedRecipientId} onValueChange={setSelectedRecipientId}>
              <SelectTrigger id="recipient">
                <SelectValue placeholder="Select recipient" />
              </SelectTrigger>
              <SelectContent>
                {recipients.map((recipient) => (
                  <SelectItem key={recipient.id} value={recipient.id}>
                    {recipient.name} ({recipient.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">Only showing recipients who can receive {receivingCurrency}</p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reason">Reason</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select reason" />
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
          <div className="grid gap-2">
            <Label htmlFor="reference">Reference (Optional)</Label>
            <Input
              id="reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="Add a reference"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedRecipientId}>
            Add Recipient
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
