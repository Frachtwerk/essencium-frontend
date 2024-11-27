export function isBrowserEnvironment(): boolean {
  return typeof window !== 'undefined'
}
