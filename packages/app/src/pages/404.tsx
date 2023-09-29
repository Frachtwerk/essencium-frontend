import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Custom404(): null {
  const router = useRouter()

  useEffect(() => {
    // router.back()

    // router.push('')
    router.replace('')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
