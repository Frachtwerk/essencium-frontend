// Call renewToken when the access token is nearing expiration (for example, 12 minutes before)
import { useAtomValue } from 'jotai'
import { useEffect, useRef } from 'react'

import { authTokenAtom, useRenewToken } from '@/api'
import { parseJwt } from '@/utils'

export function useScheduleTokenRenewal(): void {
  const token = useAtomValue(authTokenAtom)
  const { mutate: renewToken } = useRenewToken()

  const timerRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    // Clear any previous timeout to avoid duplicates.
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    if (!token) return

    const parsedToken = parseJwt(token)
    if (!parsedToken || parsedToken.expiringIn <= 0) return

    // Safe margin: when less than 12 minutes remain, renew the token.
    const safeMargin = 1000 * 60 * 12 // 12 minutes
    const timeoutDuration = Math.max(parsedToken.expiringIn - safeMargin, 0)

    timerRef.current = window.setTimeout(() => {
      // Invokes token renewal.
      renewToken()
    }, timeoutDuration)

    // Cleanup: clear the timeout if the effect is re-run.
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [token, renewToken])
}
