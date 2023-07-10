import { GetStaticProps, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export function baseGetStaticProps(): GetStaticProps {
  return async ({ locale }: GetStaticPropsContext) => {
    return {
      props: {
        ...(await serverSideTranslations(locale ?? 'en', ['common'])),
      },
    }
  }
}
