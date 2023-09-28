import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Custom404(): null {
  const router = useRouter()

  function sendHome(): void {
    router.replace(router.asPath, undefined)
  }

  useEffect(() => {
    // router.back()
    router.events.on('routeChangeComplete', sendHome)

    // router.push('/')
    // router.replace('/')
    return () => {
      router.events.off('routeChangeComplete', sendHome)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.events])

  return null
}
