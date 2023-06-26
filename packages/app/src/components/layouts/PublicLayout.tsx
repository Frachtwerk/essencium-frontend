import { PublicLayout } from '@frachtwerk/essencium-lib'
import Head from 'next/head'

type Props = {
  children: React.ReactNode
  routeName?: string
}

function PublicLayoutView({ children, routeName }: Props): JSX.Element | null {
  const pageTitle = `${routeName ? `${routeName} -` : ''} Essencium`

  return (
    <PublicLayout>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {children}
    </PublicLayout>
  )
}

export default PublicLayoutView
