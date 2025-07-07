// Call renewToken when the access token is nearing expiration (for example, 12 minutes before)
import { useAtomValue } from 'jotai'
import { useEffect, useRef } from 'react'

import { authTokenAtom, useRenewToken } from '@/api'
import { parseJwt } from '@/utils'

export function useScheduleTokenRenewal(): void {
  const token = useAtomValue(authTokenAtom)
  const { mutate: renewToken } = useRenewToken()

  const timerRef = useRef<number | undefined>(undefined)

  const intervalRef = useRef<number | undefined>(undefined)

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    if (!token || process.env.NODE_ENV === 'development') return

    const timeoutDuration = 60 * 1000

    const parsedToken = parseJwt(token)
    if (!parsedToken || parsedToken.expiringIn <= timeoutDuration) return

    timerRef.current = window.setTimeout(() => {
      renewToken()
    }, timeoutDuration)

    intervalRef.current = window.setInterval(
      () => {
        renewToken()
      },
      60 * 60 * 1000,
    )

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [token, renewToken])
}
