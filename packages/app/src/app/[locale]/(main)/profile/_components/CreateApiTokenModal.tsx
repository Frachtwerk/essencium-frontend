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
  ControlledMultiSelect,
  ControlledTextInput,
} from '@frachtwerk/essencium-lib'
import { ApiTokenInput, apiTokenInputSchema } from '@frachtwerk/essencium-types'
import { Button, Flex, Modal, Stack } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import { useAtomValue } from 'jotai'
import { type JSX, useCallback, useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  useCreateApiToken,
  useGetTokenExpirationInfo,
  userRightsAtom,
} from '@/api'
import { useZodForm } from '@/hooks'
import dayjs from '@/utils/dayjs'

type Props = {
  opened: boolean
  onClose: () => void
  onCreated: (token: string) => void
}

export function CreateApiTokenModal({
  opened,
  onClose,
  onCreated,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const userRights = useAtomValue(userRightsAtom)

  const { data: expirationSeconds } = useGetTokenExpirationInfo()

  const getDefaultValidUntil = useCallback(
    () =>
      expirationSeconds
        ? dayjs().add(expirationSeconds, 'second').format('YYYY-MM-DD')
        : dayjs().add(30, 'day').format('YYYY-MM-DD'),
    [expirationSeconds],
  )

  const { handleSubmit, control, reset } = useZodForm({
    schema: apiTokenInputSchema,
    defaultValues: {
      description: '',
      validUntil: getDefaultValidUntil(),
      rights: [],
    },
  })

  useEffect(() => {
    if (!opened) {
      reset({
        description: '',
        validUntil: getDefaultValidUntil(),
        rights: [],
      })
    }
  }, [opened, reset, getDefaultValidUntil])

  const { mutate: createToken, isPending } = useCreateApiToken({
    mutationOptions: {
      meta: {
        successNotification: false,
        errorNotification: {
          notificationType: 'created',
        },
      },
    },
  })

  const rightsOptions = (userRights ?? []).map(right => ({
    value: right,
    label: right,
  }))

  function handleCreate(data: ApiTokenInput): void {
    createToken(data, {
      onSuccess: createdToken => {
        onClose()
        if (createdToken.token) {
          onCreated(createdToken.token)
        }
      },
    })
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t('apiTokensView.createModal.title')}
      size="md"
    >
      <form onSubmit={handleSubmit(handleCreate)}>
        <Stack>
          <ControlledTextInput
            name="description"
            control={control}
            label={t('apiTokensView.createModal.description')}
            required
          />

          <Controller
            name="validUntil"
            control={control}
            render={({ field, fieldState }) => (
              <DatePickerInput
                label={t('apiTokensView.createModal.validUntil')}
                value={field.value ? dayjs(field.value).toDate() : null}
                onChange={date =>
                  field.onChange(date ? dayjs(date).format('YYYY-MM-DD') : null)
                }
                onBlur={field.onBlur}
                error={fieldState.error?.message}
                minDate={dayjs().toDate()}
                clearable
                valueFormat="DD.MM.YYYY"
              />
            )}
          />

          <ControlledMultiSelect
            name="rights"
            control={control}
            label={t('apiTokensView.createModal.rights')}
            data={rightsOptions}
            searchable
            required
          />

          <Flex className="gap-xs justify-end">
            <Button variant="light" onClick={onClose} disabled={isPending}>
              {t('actions.cancel')}
            </Button>

            <Button type="submit" loading={isPending}>
              {t('apiTokensView.createModal.submit')}
            </Button>
          </Flex>
        </Stack>
      </form>
    </Modal>
  )
}
