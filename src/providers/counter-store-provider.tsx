'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { type StoreApi, useStore } from 'zustand'

import {
  CounterState,
  type CounterStore,
  createCounterStore,
} from '@/stores/counter-store'

export const CounterStoreContext = createContext<StoreApi<CounterStore> | null>(
  null,
)

export interface CounterStoreProviderProps {
  children: ReactNode,
  initialState: CounterState,
}

export const CounterStoreProvider = ({
  children, initialState,
}: CounterStoreProviderProps) => {
  const storeRef = useRef<StoreApi<CounterStore>>()
  if (!storeRef.current) {
    storeRef.current = createCounterStore(initialState)
  }

  return (
    <CounterStoreContext.Provider value={storeRef.current}>
      {children}
    </CounterStoreContext.Provider>
  )
}

export const useCounterStore = <T, >(
  selector: (store: CounterStore) => T,
): T => {
  const counterStoreContext = useContext(CounterStoreContext)

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be use within CounterStoreProvider`)
  }

  return useStore(counterStoreContext, selector)
}
