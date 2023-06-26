import { PublicLayout } from '@frachtwerk/essencium-lib'

type Props = {
  children: React.ReactNode
}

function PublicLayoutView({ children }: Props): JSX.Element | null {
  return <PublicLayout>{children}</PublicLayout>
}

export default PublicLayoutView
