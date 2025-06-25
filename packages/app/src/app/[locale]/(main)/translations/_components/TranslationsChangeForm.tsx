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

import { hasRequiredRights } from '@frachtwerk/essencium-lib'
import {
  changeTranslationSchema,
  ChangeTranslationSchemaFormType,
  RIGHTS,
  TranslationInput,
} from '@frachtwerk/essencium-types'
import { ActionIcon, Group, Stack, TextInput } from '@mantine/core'
import { IconBackspace, IconDeviceFloppy } from '@tabler/icons-react'
import { useAtomValue } from 'jotai'
import type { JSX } from 'react'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { userRightsAtom } from '@/api'
import { useZodForm } from '@/hooks'

type Props = {
  currentValue: string
  locale: TranslationInput['locale']
  keyPath: TranslationInput['key']
  updateTranslation: (translationInput: TranslationInput) => void
  deleteTranslation: (key: TranslationInput['key']) => void
}

export function TranslationChangeForm({
  currentValue,
  locale,
  keyPath,
  updateTranslation,
  deleteTranslation,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const userRights = useAtomValue(userRightsAtom)

  const {
    handleSubmit,
    control,
    watch,
    reset: resetAndPrefillForm,
  } = useZodForm({
    schema: changeTranslationSchema,
    defaultValues: {
      translation: '',
    },
  })

  const userRightUpdate = hasRequiredRights(userRights, [
    RIGHTS.TRANSLATION_UPDATE,
  ])

  const userRightDelete = hasRequiredRights(userRights, [
    RIGHTS.TRANSLATION_DELETE,
  ])

  const fieldValue = watch('translation')

  function onSubmit(form: ChangeTranslationSchemaFormType): void {
    updateTranslation({
      locale,
      key: keyPath,
      translation: form.translation,
    })
  }

  useEffect(() => {
    resetAndPrefillForm({ translation: currentValue })
  }, [currentValue, resetAndPrefillForm])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Group>
          <Controller
            name="translation"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                aria-label={t('translationView.form.changeTranslation')}
                withAsterisk
                w="40%"
                disabled={!userRightUpdate}
                classNames={{
                  input:
                    'bg-transparent border-t-0 border-x-0 rounded-none border-b disabled:border-0 disabled:text-gray-700 disabled:dark:text-gray-400',
                }}
              />
            )}
          />

          {userRightUpdate ? (
            <ActionIcon type="submit" disabled={!fieldValue.length}>
              <IconDeviceFloppy className="size-5" />
            </ActionIcon>
          ) : null}

          {userRightDelete ? (
            <ActionIcon onClick={() => deleteTranslation(keyPath)}>
              <IconBackspace className="size-5" />
            </ActionIcon>
          ) : null}
        </Group>
      </Stack>
    </form>
  )
}
