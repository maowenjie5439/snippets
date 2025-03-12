export interface API {
  message: string
  hideWindow: (params?: { [key: string]: any }) => void
}

declare global {
  interface Window {
    api: API
  }
} 