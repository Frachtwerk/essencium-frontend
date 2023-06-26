import { Home } from '@frachtwerk/essencium-lib'
import { ReactElement } from 'react'

import AuthLayout from '@/components/layouts/AuthLayout'
import { baseGetStaticProps } from '@/utils/baseGetStaticProps'

function HomePage(): JSX.Element {
  return <Home />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>
}

export const getStaticProps = baseGetStaticProps()

export default HomePage
