import {
  TranslationInput,
  TranslationOutput,
} from '@frachtwerk/essencium-types'
import { showNotification } from '@mantine/notifications'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'next-i18next'

import { authTokenAtom } from '@/api/auth'

import { api, VERSION } from './api'

export function useGetTranslations(
  locale: TranslationInput['locale']
): UseQueryResult<TranslationOutput, AxiosError> {
  const authToken = useAtomValue(authTokenAtom)

  return useQuery<TranslationOutput, AxiosError>({
    enabled: Boolean(authToken),
    queryKey: [`useGetTranslations-${locale}`],
    queryFn: () =>
      api
        .get<TranslationOutput>(`${VERSION}/translations/${locale}`)
        .then(response => response.data),
  })
}

export function useUpdateTranslation(): UseMutationResult<
  TranslationOutput,
  AxiosError,
  TranslationInput
> {
  const { t } = useTranslation()

  const mutation = useMutation<TranslationOutput, AxiosError, TranslationInput>(
    {
      mutationKey: ['useUpdateTranslation'],
      mutationFn: ({ locale, key, translation }: TranslationInput) => {
        return api
          .put<TranslationOutput, TranslationInput['translation']>(
            `${VERSION}/translations/${locale}/${key}`,
            translation,
            {
              headers: {
                'Content-Type': 'text/plain',
              },
            }
          )
          .then(response => response.data)
      },
      onSuccess: () => {
        showNotification({
          autoClose: 2500,
          title: t('notifications.createdTranslationSuccess.title'),
          message: t('notifications.createdTranslationSuccess.message'),
          color: 'green',
          style: { position: 'fixed', top: '20px', right: '10px' },
        })
      },
      onError: () => {
        showNotification({
          autoClose: 2500,
          title: t('notifications.createdTranslationError.title'),
          message: t('notifications.createdTranslationError.message'),
          color: 'red',
          style: { position: 'fixed', top: '20px', right: '10px' },
        })
      },
    }
  )

  return mutation
}

export function useDeleteTranslation(): UseMutationResult<
  null,
  AxiosError,
  TranslationInput['key']
> {
  const { t } = useTranslation()

  const mutation = useMutation<null, AxiosError, TranslationInput['key']>({
    mutationKey: ['useDeleteTranslation'],
    mutationFn: (key: TranslationInput['key']) => {
      return api
        .delete<null>(`${VERSION}/translations/delete/${key}`, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
        .then(response => response.data)
    },
    onSuccess: () => {
      showNotification({
        autoClose: 2500,
        title: t('notifications.deletedTranslationSuccess.title'),
        message: t('notifications.deletedTranslationSuccess.message'),
        color: 'green',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
    onError: () => {
      showNotification({
        autoClose: 2500,
        title: t('notifications.deletedTranslationError.title'),
        message: t('notifications.deletedTranslationError.message'),
        color: 'red',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })
    },
  })

  return mutation
}
