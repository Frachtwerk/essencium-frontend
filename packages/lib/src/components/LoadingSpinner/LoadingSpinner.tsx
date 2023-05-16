import { Loader } from '@mantine/core'
import { useEffect, useState } from 'react'

interface Props {
  show: boolean
  delay?: number
}

export function LoadingSpinner({
  show = false,
  delay = 0,
}: Props): JSX.Element | null {
  const [showSpinner, setShowSpinner] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (!show) {
      setShowSpinner(false)
      return
    }

    if (delay === 0) {
      setShowSpinner(true)
    } else {
      timeout = setTimeout(() => setShowSpinner(true), delay)
    }

    return () => {
      clearTimeout(timeout)
    }
  }, [show, delay])

  return showSpinner ? <Loader size="xl" name="loader" /> : null
}
