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

'use client'

import {
  DeleteDialog,
  HttpNotification,
  LoadingSpinner,
  Table,
  TablePagination,
} from '@frachtwerk/essencium-lib'
import { ApiTokenOutput, ApiTokenStatus } from '@frachtwerk/essencium-types'
import {
  ActionIcon,
  Badge,
  Button,
  Flex,
  Text,
  Title,
  Tooltip,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconBan, IconKey, IconPlus, IconTrash } from '@tabler/icons-react'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useTranslations } from 'next-intl'
import { type JSX, useCallback, useMemo, useState } from 'react'

import { useDeleteApiToken, useGetAllApiTokens, useRevokeApiToken } from '@/api'
import { STATUS_COLORS } from '@/utils/apiToken'
import { formatDate } from '@/utils/formatDate'

import { CreateApiTokenModal } from '../../profile/_components/CreateApiTokenModal'
import { TokenCreatedModal } from '../../profile/_components/TokenCreatedModal'

const DEFAULT_PAGE_SIZE = 20

export default function ApiTokensAdminView(): JSX.Element {
  const t = useTranslations()

  const {
    data: allTokens,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllApiTokens()

  const { mutate: revokeToken } = useRevokeApiToken()
  const { mutate: deleteToken } = useDeleteApiToken()

  const [revokeModalOpened, revokeModalHandlers] = useDisclosure(false)
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false)
  const [createModalOpened, createModalHandlers] = useDisclosure(false)
  const [createdToken, setCreatedToken] = useState<string | null>(null)
  const [selectedToken, setSelectedToken] = useState<ApiTokenOutput | null>(
    null,
  )
  const [sorting, setSorting] = useState<SortingState>([])

  const flatTokens = useMemo<ApiTokenOutput[]>(
    () => Object.values(allTokens ?? {}).flat(),
    [allTokens],
  )

  const handleRevokeClick = useCallback(
    (token: ApiTokenOutput): void => {
      setSelectedToken(token)
      revokeModalHandlers.open()
    },
    [revokeModalHandlers],
  )

  const handleDeleteClick = useCallback(
    (token: ApiTokenOutput): void => {
      setSelectedToken(token)
      deleteModalHandlers.open()
    },
    [deleteModalHandlers],
  )

  function handleConfirmRevoke(): void {
    if (!selectedToken?.id) return
    revokeToken(String(selectedToken.id), {
      onSettled: () => revokeModalHandlers.close(),
    })
  }

  function handleConfirmDelete(): void {
    if (!selectedToken?.id) return
    deleteToken(String(selectedToken.id), {
      onSettled: () => deleteModalHandlers.close(),
    })
  }

  const columns = useMemo<ColumnDef<ApiTokenOutput>[]>(
    () => [
      {
        accessorKey: 'linkedUser',
        header: () => (
          <Text inherit>{t('apiTokensView.table.linkedUser')}</Text>
        ),
        cell: info => info.row.original.linkedUser.name,
        enableSorting: false,
        enableColumnFilter: false,
        size: 180,
      },
      {
        accessorKey: 'description',
        header: () => (
          <Text inherit>{t('apiTokensView.table.description')}</Text>
        ),
        cell: info => info.getValue(),
        enableColumnFilter: false,
        size: 200,
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
        enableColumnFilter: false,
        size: 180,
      },
      {
        accessorKey: 'validUntil',
        header: () => (
          <Text inherit>{t('apiTokensView.table.validUntil')}</Text>
        ),
        cell: info => {
          return formatDate(info.getValue())
        },
        enableColumnFilter: false,
        size: 130,
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
        enableSorting: false,
        enableColumnFilter: false,
        size: 250,
      },
      {
        accessorKey: 'createdAt',
        header: () => <Text inherit>{t('apiTokensView.table.createdAt')}</Text>,
        cell: info => {
          return formatDate(info.getValue())
        },
        enableColumnFilter: false,
        size: 130,
      },
      {
        accessorKey: 'actions',
        header: () => <Text inherit>{t('apiTokensView.table.actions')}</Text>,
        enableSorting: false,
        enableColumnFilter: false,
        cell: info => {
          const token = info.row.original
          return (
            <Flex className="gap-xs flex-row">
              {token.status === ApiTokenStatus.ACTIVE ? (
                <Tooltip label={t('apiTokensView.action.revoke')}>
                  <ActionIcon
                    size="sm"
                    variant="transparent"
                    color="orange"
                    onClick={() => handleRevokeClick(token)}
                    aria-label={t('apiTokensView.action.revoke')}
                  >
                    <IconBan size={16} aria-hidden />
                  </ActionIcon>
                </Tooltip>
              ) : null}

              <Tooltip label={t('apiTokensView.action.delete')}>
                <ActionIcon
                  size="sm"
                  variant="transparent"
                  color="red"
                  onClick={() => handleDeleteClick(token)}
                  aria-label={t('apiTokensView.action.delete')}
                >
                  <IconTrash size={16} aria-hidden />
                </ActionIcon>
              </Tooltip>
            </Flex>
          )
        },
        size: 80,
      },
    ],
    [t, handleRevokeClick, handleDeleteClick],
  )

  const table = useReactTable({
    data: flatTokens,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: DEFAULT_PAGE_SIZE } },
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

      <Flex className="py-md items-center justify-between">
        <Title order={2}>
          <Flex className="gap-xs items-center">
            <IconKey className="size-8" />
            <Text inherit>{t('apiTokensView.title')}</Text>
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
        <LoadingSpinner show />
      ) : (
        <>
          <Table tableModel={table} />

          <TablePagination
            table={table}
            activePage={table.getState().pagination.pageIndex + 1}
            pageSize={table.getState().pagination.pageSize}
            setActivePage={page => table.setPageIndex(page - 1)}
            setPageSize={size => table.setPageSize(size)}
            pageCount={table.getPageCount()}
          />
        </>
      )}

      <CreateApiTokenModal
        opened={createModalOpened}
        onClose={createModalHandlers.close}
        onCreated={token => setCreatedToken(token)}
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

      <DeleteDialog
        opened={deleteModalOpened}
        onClose={deleteModalHandlers.close}
        deleteFunction={handleConfirmDelete}
        title={t('apiTokensView.deleteDialog.title')}
        text={t('apiTokensView.deleteDialog.text')}
      />
    </>
  )
}
