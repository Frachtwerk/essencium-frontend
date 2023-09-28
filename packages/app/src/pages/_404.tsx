import { useGetMe } from '@frachtwerk/essencium-lib'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Custom404(): null {
  const router = useRouter()

  const { data: user } = useGetMe()

  useEffect(() => {
    router.replace('/', undefined, {
      locale: user?.locale,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath])

  return null
}
