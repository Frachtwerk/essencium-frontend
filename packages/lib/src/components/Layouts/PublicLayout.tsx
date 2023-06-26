import { Center } from '@mantine/core'

type Props = {
  children: React.ReactNode
}

export function PublicLayout({ children }: Props): JSX.Element | null {
  return <Center>{children}</Center>
}
