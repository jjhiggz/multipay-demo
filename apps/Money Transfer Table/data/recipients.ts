import type { Recipient } from "@/components/money-transfer-table"

export const recipients: Recipient[] = [
  {
    id: "rec-1",
    name: "John Doe",
    email: "john.doe@example.com",
    accountId: "ACC123456",
  },
  {
    id: "rec-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    accountId: "ACC789012",
  },
  {
    id: "rec-3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    accountId: "ACC345678",
  },
  {
    id: "rec-4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    accountId: "ACC901234",
  },
  {
    id: "rec-5",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    accountId: "ACC567890",
  },
  {
    id: "rec-6",
    name: "Sarah Brown",
    email: "sarah.brown@example.com",
    accountId: "ACC234567",
  },
  {
    id: "rec-7",
    name: "David Miller",
    email: "david.miller@example.com",
    accountId: "ACC890123",
  },
  {
    id: "rec-8",
    name: "Lisa Taylor",
    email: "lisa.taylor@example.com",
    accountId: "ACC456789",
  },
]

export const initialRecipients = recipients.slice(0, 5)
