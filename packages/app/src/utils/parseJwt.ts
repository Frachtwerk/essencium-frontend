export function parseJwt(token: string): Record<string, number> | null {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(''),
    )
    const parsedToken = JSON.parse(jsonPayload)
    const expiringIn = new Date(parsedToken.exp * 1000).getTime() - Date.now()
    return { expiringIn, ...parsedToken }
  } catch (error) {
    return null
  }
}
