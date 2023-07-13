import { getTranslation, Home } from '@frachtwerk/essencium-lib'
import { ReactElement } from 'react'

import AuthLayout from '@/components/layouts/AuthLayout'
import { baseGetStaticProps } from '@/utils/next'

function HomePage(): JSX.Element {
  return <Home />
}

HomePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout routeName={getTranslation('navigation.home.label')}>
      {page}
    </AuthLayout>
  )
}

export const getStaticProps = baseGetStaticProps()

export default HomePage
