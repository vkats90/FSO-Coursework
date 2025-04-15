export type Person = {
  name: string
  number: string
  id: string
}

export interface Message {
  type: 'error' | 'success'
  message: string
}
