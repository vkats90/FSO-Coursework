import { createContext, useContext } from 'react'
import type { AppContextType } from '../../types'

export const AppData = createContext<AppContextType | null>(null)

export const useAppData = () => {
  const context = useContext(AppData)
  if (!context) throw new Error('context is not defined')
  return context
}
