/* eslint-disable react/no-unstable-nested-components */
import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Flex,
  Loader,
  Text,
  Title,
} from '@mantine/core'
import {
  IconCheck,
  IconDotsVertical,
  IconPencil,
  IconTrash,
  IconUsers,
  IconX,
} from '@tabler/icons-react'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { HttpNotification, Table, TablePagination } from 'lib'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RoleOutput, UserOutput } from 'types'

import { useGetUsers } from '@/api'

export function UsersView(): JSX.Element {
  const { t } = useTranslation()

  const [activePage, setActivePage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [sorting, setSorting] = useState<SortingState>([])

  const {
    data: users,
    isError,
    isLoading,
    isFetching,
    error,
    isInitialLoading,
    refetch: refetchUsers,
  } = useGetUsers({ page: activePage - 1, size: pageSize })

  const handleRefetch = useCallback((): void => {
    refetchUsers()
  }, [refetchUsers])

  const columns = useMemo<ColumnDef<UserOutput>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => <Text>{t('usersView.table.id')}</Text>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'enabled',
        header: () => <Text>{t('usersView.table.active')}</Text>,
        cell: info => (info.getValue() ? <IconCheck /> : <IconX />),
      },
      {
        accessorKey: 'firstName',
        header: () => <Text>{t('usersView.table.firstName')}</Text>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'lastName',
        header: () => <Text>{t('usersView.table.lastName')}</Text>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'phone',
        header: () => <Text>{t('usersView.table.phone')}</Text>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'email',
        header: () => <Text>{t('usersView.table.email')}</Text>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'locale',
        header: () => <Text>{t('usersView.table.locale')}</Text>,
        cell: info => t(`${info.getValue()}`),
      },
      {
        accessorKey: 'role',
        header: () => <Text>{t('usersView.table.role')}</Text>,
        cell: info => (
          <Badge variant="outline">
            {(info.getValue() as RoleOutput).name}
          </Badge>
        ),
      },
      {
        accessorKey: 'actions',
        header: () => <Text>{t('usersView.table.actions')}</Text>,
        cell: info => {
          const isAdmin = info.row.original.role.name === 'ADMIN'

          return (
            <Flex direction="row" gap="xs">
              <ActionIcon size="sm" disabled={isAdmin} variant="transparent">
                <IconPencil />
              </ActionIcon>

              <ActionIcon size="sm" disabled={isAdmin} variant="transparent">
                <IconTrash />
              </ActionIcon>

              <ActionIcon size="sm" disabled={isAdmin} variant="transparent">
                <IconDotsVertical />
              </ActionIcon>
            </Flex>
          )
        },
      },
    ],
    [t]
  )

  const table = useReactTable({
    data: users?.content || [],
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: users?.totalPages,
  })

  return (
    <>
      <HttpNotification
        isLoading={isFetching && !isInitialLoading}
        isError={isError}
        errorTitle={`Error ${
          error?.response?.status ? `(${error?.response?.status})` : ''
        }`}
        errorMessage={error?.message}
        loadingTitle={t('notifications.loadingAsyncData.title') as string}
        loadingMessage={t('notifications.loadingAsyncData.message') as string}
      />

      <Flex py="md" justify="space-between" align="center">
        <Title size="h2">
          <Flex align="center" gap={10}>
            <IconUsers size="32" />
            <Text> {t('usersView.title')}</Text>
          </Flex>
        </Title>

        <Flex align="center" gap="xs">
          <Button
            variant="light"
            onClick={() => {
              handleRefetch()
            }}
          >
            {t('usersView.action.refresh')}
          </Button>

          <Button onClick={() => {}}>{t('usersView.action.add')}</Button>
        </Flex>
      </Flex>

      {isLoading ? (
        <Center h="100%">
          <Loader size="xl" name="loader" />
        </Center>
      ) : (
        <>
          <Table tableModel={table} />

          <TablePagination
            table={table}
            activePage={activePage}
            pageSize={pageSize}
            setActivePage={setActivePage}
            setPageSize={setPageSize}
            handleRefetch={handleRefetch}
          />
        </>
      )}
    </>
  )
}
