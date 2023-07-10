import { withBaseStylingShowNotification } from '@frachtwerk/essencium-lib'
import {
  TranslationInput,
  TranslationOutput,
} from '@frachtwerk/essencium-types'
import {
  useMutation,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useAtomValue } from 'jotai'

import { authTokenAtom } from '@/api/auth'

import { api } from './api'

export function useGetTranslations(
  locale: TranslationInput['locale']
): UseQueryResult<TranslationOutput, AxiosError> {
  const authToken = useAtomValue(authTokenAtom)

  return useQuery<TranslationOutput, AxiosError>({
    enabled: Boolean(authToken),
    queryKey: [`useGetTranslations-${locale}`],
    queryFn: () =>
      api
        .get<TranslationOutput>(`/translations/${locale}`)
        .then(response => response.data),
  })
}

export function useUpdateTranslation(): UseMutationResult<
  TranslationOutput,
  AxiosError,
  TranslationInput
> {
  const mutation = useMutation<TranslationOutput, AxiosError, TranslationInput>(
    {
      mutationKey: ['useUpdateTranslation'],
      mutationFn: ({ locale, key, translation }: TranslationInput) => {
        return api
          .put<TranslationOutput, TranslationInput['translation']>(
            `/translations/${locale}/${key}`,
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
        withBaseStylingShowNotification({
          notificationType: 'updated',
          color: 'success',
        })
      },
      onError: () => {
        withBaseStylingShowNotification({
          notificationType: 'updated',
          color: 'error',
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
  const mutation = useMutation<null, AxiosError, TranslationInput['key']>({
    mutationKey: ['useDeleteTranslation'],
    mutationFn: (key: TranslationInput['key']) => {
      return api
        .delete<null>(`/translations/delete/${key}`, {
          headers: {
            'Content-Type': 'text/plain',
          },
        })
        .then(response => response.data)
    },
    onSuccess: () => {
      withBaseStylingShowNotification({
        notificationType: 'deleted',
        color: 'success',
      })
    },
    onError: () => {
      withBaseStylingShowNotification({
        notificationType: 'deleted',
        color: 'error',
      })
    },
  })

  return mutation
}
