import { Home } from '@frachtwerk/essencium-lib'
import { ReactElement } from 'react'

import Layout from '@/components/layouts/AuthLayout'
import { baseGetStaticProps } from '@/utils/baseGetStaticProps'

function HomePage(): JSX.Element {
  return <Home />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export const getStaticProps = baseGetStaticProps()

export default HomePage
