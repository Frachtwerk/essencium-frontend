import { router } from '@/router/init'

export function logout(): void {
  localStorage.removeItem('authToken')

  localStorage.removeItem('user')

  router.navigate({ to: '/login' })
}
