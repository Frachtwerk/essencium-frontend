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

import { Button, Flex, Modal, Text, Title } from '@mantine/core'
import { useTranslation } from 'next-i18next'
import type { JSX } from 'react'

type Props = {
  deleteFunction: () => void
  title: string
  text: string
  opened: boolean
  onClose: () => void
}

export function DeleteDialog({
  deleteFunction,
  title,
  text,
  opened,
  onClose,
}: Props): JSX.Element {
  const { t } = useTranslation()
  return (
    <Modal
      opened={opened}
      closeOnClickOutside={false}
      closeOnEscape
      onClose={onClose}
      withCloseButton={false}
      className="p-lg"
      centered
    >
      <Title order={4} className="mb-md">
        {title}
      </Title>

      <Text className="mb-md">{text}</Text>

      <Flex justify="space-around" className="gap-lg">
        <Button fullWidth className="mt-md" onClick={deleteFunction}>
          {t('actions.delete')}
        </Button>

        <Button variant="subtle" fullWidth className="mt-md" onClick={onClose}>
          {t('actions.cancel')}
        </Button>
      </Flex>
    </Modal>
  )
}
