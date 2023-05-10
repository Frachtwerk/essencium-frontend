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
import { Link as Routerlink, useNavigate } from '@tanstack/react-router'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useAtom } from 'jotai'
import { HttpNotification, Table, TablePagination } from 'lib'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RIGHTS, RoleOutput, UserOutput } from 'types'

import { useDeleteUser, useGetUsers } from '@/api'
import { userAtom } from '@/api/me'
import { parseSorting } from '@/utils/parseSorting'

export const FORM_DEFAULTS = {
  firstName: '',
  lastName: '',
  phone: '',
  mobile: '',
  email: '',
  password: '',
  enabled: true,
  locale: 'de',
  role: undefined,
  source: 'local',
}

const DEFAULT_SORTING: SortingState = [{ id: 'id', desc: false }]

export function UsersView(): JSX.Element {
  const [user] = useAtom(userAtom)

  const { t } = useTranslation()

  const navigate = useNavigate()

  const [activePage, setActivePage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORTING)

  const {
    data: users,
    isError,
    isLoading,
    isFetching,
    error,
    isInitialLoading,
    refetch: refetchUsers,
  } = useGetUsers({
    page: activePage - 1,
    size: pageSize,
    sort: parseSorting(sorting, DEFAULT_SORTING),
  })

  const handleRefetch = useCallback((): void => {
    refetchUsers()
  }, [refetchUsers])

  const handleEditUser = useCallback(
    (userToEdit: UserOutput) => {
      navigate({ to: `${userToEdit.id}` })
    },
    [navigate]
  )

  const { mutate: deleteUser } = useDeleteUser()

  const handleDeleteUser = useCallback(
    (userToDelete: UserOutput) => {
      deleteUser(userToDelete.id, {
        onSuccess: () => refetchUsers(),
      })
    },
    [deleteUser, refetchUsers]
  )

  const columns = useMemo<ColumnDef<UserOutput>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => <Text>{t('usersView.table.id')}</Text>,
        cell: info => info.getValue(),
        size: 60,
      },
      {
        accessorKey: 'enabled',
        header: () => <Text>{t('usersView.table.active')}</Text>,
        cell: info => (info.getValue() ? <IconCheck /> : <IconX />),
        size: 60,
      },
      {
        accessorKey: 'firstName',
        header: () => <Text>{t('usersView.table.firstName')}</Text>,
        cell: info => info.getValue(),
        size: 120,
      },
      {
        accessorKey: 'lastName',
        header: () => <Text>{t('usersView.table.lastName')}</Text>,
        cell: info => info.getValue(),
        size: 120,
      },
      {
        accessorKey: 'phone',
        header: () => <Text>{t('usersView.table.phone')}</Text>,
        cell: info => info.getValue(),
        size: 180,
      },
      {
        accessorKey: 'email',
        header: () => <Text>{t('usersView.table.email')}</Text>,
        cell: info => info.getValue(),
        size: 230,
        maxSize: 250,
      },
      {
        accessorKey: 'locale',
        header: () => <Text>{t('usersView.table.locale')}</Text>,
        cell: info => t(`${info.getValue()}`),
        size: 120,
      },
      {
        accessorKey: 'role',
        header: () => <Text>{t('usersView.table.role')}</Text>,
        cell: info => (
          <Badge variant="outline">
            {(info.getValue() as RoleOutput).name}
          </Badge>
        ),
        size: 120,
      },
      {
        accessorKey: 'actions',
        header: () => <Text>{t('usersView.table.actions')}</Text>,
        enableSorting: false,
        size: 120,

        cell: info => {
          const rowUser = info.row.original

          const isAdmin = rowUser.role.name === 'ADMIN'

          return (
            <Flex direction="row" gap="xs">
              {user?.role.rights
                .map(right => right.name)
                .includes(RIGHTS.USER_UPDATE) ? (
                <ActionIcon size="sm" disabled={isAdmin} variant="transparent">
                  <IconPencil onClick={() => handleEditUser(rowUser)} />
                </ActionIcon>
              ) : null}

              {user?.role.rights
                .map(right => right.name)
                .includes(RIGHTS.USER_DELETE) ? (
                <ActionIcon size="sm" disabled={isAdmin} variant="transparent">
                  <IconTrash onClick={() => handleDeleteUser(rowUser)} />
                </ActionIcon>
              ) : null}

              <ActionIcon size="sm" disabled={isAdmin} variant="transparent">
                <IconDotsVertical />
              </ActionIcon>
            </Flex>
          )
        },
      },
    ],
    [t, handleEditUser, handleDeleteUser, user]
  )

  const table = useReactTable({
    data: users?.content || [],
    columns,
    state: {
      sorting,
    },
    manualSorting: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
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

            <Text>{t('usersView.title')}</Text>
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

          {user?.role.rights
            .map(right => right.name)
            .includes(RIGHTS.USER_CREATE) ? (
            <Button>
              <Routerlink
                style={{ textDecoration: 'none', color: 'white' }}
                to="add"
              >
                {t('usersView.action.add')}
              </Routerlink>
            </Button>
          ) : null}
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
