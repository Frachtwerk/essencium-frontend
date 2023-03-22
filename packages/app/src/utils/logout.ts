import { router } from '@/router/init'

export function logout(): void {
  localStorage.removeItem('authToken')

  router.navigate({ to: '/login' })
}
