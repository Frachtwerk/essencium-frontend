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

import { Alert, Button, Code, Flex, Modal, Text } from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import { IconAlertTriangle, IconCheck, IconCopy } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { type JSX } from 'react'

type Props = {
  opened: boolean
  token: string
  onClose: () => void
}

export function TokenCreatedModal({
  opened,
  token,
  onClose,
}: Props): JSX.Element {
  const t = useTranslations()

  const clipboard = useClipboard({ timeout: 2000 })

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={t('apiTokensView.tokenCreated.title')}
      size="lg"
    >
      <Alert
        icon={<IconAlertTriangle size={16} />}
        color="orange"
        className="mb-md"
      >
        <Text size="sm">{t('apiTokensView.tokenCreated.warning')}</Text>
      </Alert>

      <Code block className="mb-md break-all">
        {token}
      </Code>

      <Flex className="gap-xs justify-end">
        <Button
          leftSection={
            clipboard.copied ? <IconCheck size={16} /> : <IconCopy size={16} />
          }
          variant={clipboard.copied ? 'light' : 'filled'}
          color={clipboard.copied ? 'green' : undefined}
          onClick={() => clipboard.copy(token)}
        >
          {clipboard.copied
            ? t('apiTokensView.tokenCreated.copied')
            : t('apiTokensView.tokenCreated.copy')}
        </Button>

        <Button variant="light" onClick={onClose}>
          {t('actions.close')}
        </Button>
      </Flex>
    </Modal>
  )
}
