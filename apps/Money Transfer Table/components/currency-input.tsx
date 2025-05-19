"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"

interface CurrencyInputProps {
  value: number
  onChange: (value: number) => void
  currency: string
  className?: string
}

export function CurrencyInput({ value, onChange, currency, className }: CurrencyInputProps) {
  const [displayValue, setDisplayValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEditing, setIsEditing] = useState(false)

  // Format the number with commas for thousands and exactly two decimal places
  const formatValue = (num: number): string => {
    // Use Intl.NumberFormat for consistent formatting
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  }

  // Update the display value when the actual value changes or component mounts
  useEffect(() => {
    if (!isEditing) {
      setDisplayValue(formatValue(value))
    }
  }, [value, isEditing])

  const handleFocus = () => {
    setIsEditing(true)
    // When focusing, we can either keep the formatted value or switch to a plain number
    // Here we keep the formatted value to avoid confusion
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Get the raw input value
    let inputValue = e.target.value

    // Remove all non-numeric characters except decimal point
    inputValue = inputValue.replace(/[^0-9.]/g, "")

    // Ensure only one decimal point
    const parts = inputValue.split(".")
    if (parts.length > 2) {
      inputValue = parts[0] + "." + parts.slice(1).join("")
    }

    setDisplayValue(inputValue)

    // Only update the actual value if it's a valid number
    if (inputValue !== "" && !isNaN(Number(inputValue))) {
      onChange(Number(inputValue))
    } else if (inputValue === "" || inputValue === ".") {
      onChange(0)
    }
  }

  const handleBlur = () => {
    setIsEditing(false)
    // When blurring, always format the value properly
    setDisplayValue(formatValue(value))
  }

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        type="text"
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`pr-12 text-right ${className}`}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-muted-foreground">
        {currency}
      </div>
    </div>
  )
}
