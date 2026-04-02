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
  DeleteDialog,
  HttpNotification,
  Table,
  TablePagination,
} from '@frachtwerk/essencium-lib'
import { ApiTokenOutput, ApiTokenStatus } from '@frachtwerk/essencium-types'
import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Flex,
  Loader,
  MantineColor,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconBan, IconKey, IconPlus } from '@tabler/icons-react'
import {
  ColumnDef,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { type JSX, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetApiTokens, useRevokeApiToken } from '@/api'
import { parseSorting } from '@/utils'
import dayjs from '@/utils/dayjs'

import { CreateApiTokenModal } from './CreateApiTokenModal'
import { TokenCreatedModal } from './TokenCreatedModal'

const DEFAULT_SORTING: SortingState = [{ id: 'createdAt', desc: true }]

const STATUS_COLORS: Record<ApiTokenStatus, MantineColor> = {
  [ApiTokenStatus.ACTIVE]: 'green',
  [ApiTokenStatus.REVOKED]: 'red',
  [ApiTokenStatus.REVOKED_ROLE_CHANGED]: 'red',
  [ApiTokenStatus.REVOKED_RIGHTS_CHANGED]: 'red',
  [ApiTokenStatus.REVOKED_USER_CHANGED]: 'red',
  [ApiTokenStatus.EXPIRED]: 'yellow',
  [ApiTokenStatus.USER_DELETED]: 'gray',
}

export function ApiTokensSection(): JSX.Element {
  const { t } = useTranslation()

  const [activePage, setActivePage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORTING)

  const [createModalOpened, createModalHandlers] = useDisclosure(false)
  const [createdToken, setCreatedToken] = useState<string | null>(null)
  const [revokeModalOpened, revokeModalHandlers] = useDisclosure(false)
  const [tokenToRevoke, setTokenToRevoke] = useState<ApiTokenOutput | null>(
    null,
  )

  const {
    data: tokens,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetApiTokens({
    pagination: {
      page: activePage - 1,
      size: pageSize,
      sort: parseSorting(sorting, DEFAULT_SORTING),
    },
  })

  const { mutate: revokeToken } = useRevokeApiToken()

  const handleRevoke = useCallback(
    (token: ApiTokenOutput): void => {
      setTokenToRevoke(token)
      revokeModalHandlers.open()
    },
    [revokeModalHandlers],
  )

  function handleConfirmRevoke(): void {
    if (!tokenToRevoke?.id) return
    revokeToken(String(tokenToRevoke.id), {
      onSettled: () => revokeModalHandlers.close(),
    })
  }

  function handleTokenCreated(token: string): void {
    setCreatedToken(token)
  }

  const columns = useMemo<ColumnDef<ApiTokenOutput>[]>(
    () => [
      {
        accessorKey: 'description',
        header: () => (
          <Text inherit>{t('apiTokensView.table.description')}</Text>
        ),
        cell: info => info.getValue(),
        size: 200,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'status',
        header: () => <Text inherit>{t('apiTokensView.table.status')}</Text>,
        cell: info => {
          const status = info.getValue() as ApiTokenStatus
          return (
            <Badge color={STATUS_COLORS[status]} variant="light">
              {t(`apiTokensView.status.${status}`)}
            </Badge>
          )
        },
        size: 180,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'validUntil',
        header: () => (
          <Text inherit>{t('apiTokensView.table.validUntil')}</Text>
        ),
        cell: info => {
          const raw = info.getValue()
          return raw ? dayjs(String(raw)).format('DD.MM.YYYY') : '—'
        },
        size: 130,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'rights',
        header: () => <Text inherit>{t('apiTokensView.table.rights')}</Text>,
        cell: info => {
          const rights = info.row.original.rights
          return (
            <Flex className="gap-xs flex-wrap">
              {rights.map(right => (
                <Badge key={right.authority} variant="outline" size="xs">
                  {right.authority}
                </Badge>
              ))}
            </Flex>
          )
        },
        size: 250,
        enableColumnFilter: false,
        enableSorting: false,
      },
      {
        accessorKey: 'createdAt',
        header: () => <Text inherit>{t('apiTokensView.table.createdAt')}</Text>,
        cell: info => {
          const raw = info.getValue()
          return raw ? dayjs(String(raw)).format('DD.MM.YYYY') : '—'
        },
        size: 130,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'actions',
        header: () => <Text inherit>{t('apiTokensView.table.actions')}</Text>,
        enableSorting: false,
        enableColumnFilter: false,
        cell: info => {
          const token = info.row.original
          const isActive = token.status === ApiTokenStatus.ACTIVE
          return (
            <Flex className="gap-xs">
              {isActive ? (
                <Tooltip label={t('apiTokensView.action.revoke')}>
                  <ActionIcon
                    size="sm"
                    variant="transparent"
                    color="orange"
                    onClick={() => handleRevoke(token)}
                    aria-label={t('apiTokensView.action.revoke')}
                  >
                    <IconBan aria-hidden />
                  </ActionIcon>
                </Tooltip>
              ) : null}
            </Flex>
          )
        },
        size: 80,
      },
    ],
    [t, handleRevoke],
  )

  const table = useReactTable({
    data: tokens?.content ?? [],
    columns,
    state: { sorting },
    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    pageCount: tokens?.totalPages,
  })

  return (
    <>
      <HttpNotification
        isLoading={isFetching && !isLoading}
        isError={isError}
        errorTitle={`Error ${error?.response?.status ? `(${error.response.status})` : ''}`}
        errorMessage={error?.message}
        loadingTitle={t('notifications.loadingAsyncData.title') as string}
        loadingMessage={t('notifications.loadingAsyncData.message') as string}
      />

      <Stack>
        <Flex className="py-md items-center justify-between">
          <Title order={3}>
            <Flex className="gap-xs items-center">
              <IconKey className="size-6" />
              <Text inherit>{t('profileView.apiTokens.title')}</Text>
            </Flex>
          </Title>

          <Button
            leftSection={<IconPlus size={16} />}
            onClick={createModalHandlers.open}
          >
            {t('apiTokensView.action.create')}
          </Button>
        </Flex>

        {isLoading ? (
          <Center className="py-xl">
            <Loader />
          </Center>
        ) : (
          <>
            <Table tableModel={table} setActivePage={setActivePage} />

            <TablePagination
              table={table}
              activePage={activePage}
              pageSize={pageSize}
              setActivePage={setActivePage}
              setPageSize={setPageSize}
            />
          </>
        )}
      </Stack>

      <CreateApiTokenModal
        opened={createModalOpened}
        onClose={createModalHandlers.close}
        onCreated={handleTokenCreated}
      />

      <TokenCreatedModal
        opened={Boolean(createdToken)}
        token={createdToken ?? ''}
        onClose={() => setCreatedToken(null)}
      />

      <DeleteDialog
        opened={revokeModalOpened}
        onClose={revokeModalHandlers.close}
        deleteFunction={handleConfirmRevoke}
        title={t('apiTokensView.revokeDialog.title')}
        text={t('apiTokensView.revokeDialog.text')}
      />
    </>
  )
}
