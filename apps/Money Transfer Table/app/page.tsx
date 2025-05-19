import { MoneyTransferTable } from "@/components/money-transfer-table"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Money Transfer</h1>
      <MoneyTransferTable />
    </main>
  )
}
