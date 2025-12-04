/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

import {
  TranslationInput,
  TranslationOutput,
} from '@frachtwerk/essencium-types'
import { useMutation, UseMutationResult } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { api } from './api'
import { createUseGetPage, UseGetPage } from './base'

const RESOURCE = 'translations'

export const useGetTranslations = (
  locale: TranslationInput['locale'],
): UseGetPage<TranslationOutput, Record<string, never>> =>
  createUseGetPage(`${RESOURCE}/${locale}`)

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
            },
          )
          .then(response => response.data)
      },
      meta: {
        errorNotification: {
          notificationType: 'updated',
        },
        successNotification: {
          notificationType: 'updated',
        },
      },
    },
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
    meta: {
      errorNotification: {
        notificationType: 'deleted',
      },
      successNotification: {
        notificationType: 'deleted',
      },
    },
  })

  return mutation
}
