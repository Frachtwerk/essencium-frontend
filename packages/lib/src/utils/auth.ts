export function logout(): void {
  localStorage.removeItem('authToken')

  localStorage.removeItem('user')
}
