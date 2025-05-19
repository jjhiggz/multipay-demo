"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface TransferSummaryProps {
  totalSendingAmount: number
  totalReceivingAmount: number
  sendingCurrency: string
  receivingCurrency: string
  exchangeRate: number
}

export function TransferSummary({
  totalSendingAmount,
  totalReceivingAmount,
  sendingCurrency,
  receivingCurrency,
  exchangeRate,
}: TransferSummaryProps) {
  // Mock fee calculation for demonstration
  const fee = totalSendingAmount * 0.01 // 1% fee
  const totalToPay = totalSendingAmount + fee

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
    <Card className="w-full sticky bottom-0 mt-4 border-t shadow-lg z-10">
      <CardContent className="p-4">
        {/* Desktop view - 5 columns */}
        <div className="hidden md:grid md:grid-cols-5 md:gap-4">
          {/* Column 1: Total to send */}
          <div>
            <div className="text-sm font-medium text-muted-foreground">Total to send</div>
            <div className="text-xl font-bold">
              {getCurrencySymbol(sendingCurrency)}
              {formatAmountWithoutSymbol(totalSendingAmount)} {sendingCurrency}
            </div>
          </div>

          {/* Column 2: Exchange rate */}
          <div>
            <div className="text-sm font-medium text-muted-foreground">Exchange rate</div>
            <div className="text-lg font-medium">
              1 {sendingCurrency} = {exchangeRate} {receivingCurrency}
            </div>
          </div>

          {/* Column 3: Recipients will receive */}
          <div>
            <div className="text-sm font-medium text-muted-foreground">Recipients will receive</div>
            <div className="text-xl font-bold">
              {getCurrencySymbol(receivingCurrency)}
              {formatAmountWithoutSymbol(totalReceivingAmount)} {receivingCurrency}
            </div>
          </div>

          {/* Column 4: Total to pay with fee */}
          <div>
            <div className="text-sm font-medium text-muted-foreground">Total to pay</div>
            <div className="text-xl font-bold">
              {getCurrencySymbol(sendingCurrency)}
              {formatAmountWithoutSymbol(totalToPay)} {sendingCurrency}
            </div>
            <div className="text-sm text-muted-foreground mt-1">
              Includes fee: {getCurrencySymbol(sendingCurrency)}
              {formatAmountWithoutSymbol(fee)} {sendingCurrency}
            </div>
          </div>

          {/* Column 5: Continue button */}
          <div className="flex items-center justify-center">
            <Button className="w-full" size="lg">
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile view - stacked with label and value on same row */}
        <div className="flex flex-col space-y-3 md:hidden">
          {/* Total to send */}
          <div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">Total to send</div>
              <div className="text-sm font-medium">
                {getCurrencySymbol(sendingCurrency)}
                {formatAmountWithoutSymbol(totalSendingAmount)} {sendingCurrency}
              </div>
            </div>
          </div>

          {/* Exchange rate */}
          <div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">Exchange rate</div>
              <div className="text-sm font-medium">
                1 {sendingCurrency} = {exchangeRate} {receivingCurrency}
              </div>
            </div>
          </div>

          {/* Recipients will receive */}
          <div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">Recipients will receive</div>
              <div className="text-sm font-medium">
                {getCurrencySymbol(receivingCurrency)}
                {formatAmountWithoutSymbol(totalReceivingAmount)} {receivingCurrency}
              </div>
            </div>
          </div>

          {/* Total to pay */}
          <div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">Total to pay</div>
              <div className="text-sm font-medium">
                {getCurrencySymbol(sendingCurrency)}
                {formatAmountWithoutSymbol(totalToPay)} {sendingCurrency}
              </div>
            </div>
            <div className="flex justify-between items-center mt-1">
              <div className="text-xs text-muted-foreground">Includes fee:</div>
              <div className="text-xs text-muted-foreground">
                {getCurrencySymbol(sendingCurrency)}
                {formatAmountWithoutSymbol(fee)} {sendingCurrency}
              </div>
            </div>
          </div>

          {/* Continue button */}
          <Button className="w-full mt-2" size="lg">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
