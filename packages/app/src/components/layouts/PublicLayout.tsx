import { Center } from '@mantine/core'
import Head from 'next/head'

type Props = {
  children: React.ReactNode
  routeName?: string
}

function PublicLayoutView({ children, routeName }: Props): JSX.Element | null {
  const pageTitle = `${routeName ? `${routeName} -` : ''} Essencium`

  return (
    <Center>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {children}
    </Center>
  )
}

export default PublicLayoutView
