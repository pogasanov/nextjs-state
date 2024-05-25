import { HomePage } from '@/components/pages/home-page'
import { initCounterStore } from "@/stores/counter-store";
import { CounterStoreProvider } from "@/providers/counter-store-provider";

export default async function Home() {
  const state = await initCounterStore()

  return (
    <CounterStoreProvider initialState={state}>
      <HomePage />
    </CounterStoreProvider>
  )
}
