import { Contact } from '@frachtwerk/essencium-lib'

import AuthLayout from '@/components/layouts/AuthLayout'
import { baseGetStaticProps } from '@/utils/baseGetStaticProps'

function ContactView(): JSX.Element {
  return <Contact />
}

ContactView.getLayout = function getLayout(page: React.ReactNode): JSX.Element {
  return <AuthLayout>{page}</AuthLayout>
}

export const getStaticProps = baseGetStaticProps()

export default ContactView
