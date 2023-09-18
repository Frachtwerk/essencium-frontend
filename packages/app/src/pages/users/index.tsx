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

/* eslint-disable react/no-unstable-nested-components */
import {
  DeleteDialog,
  getTranslation,
  HttpNotification,
  parseSorting,
  Table,
  TablePagination,
} from '@frachtwerk/essencium-lib'
import {
  FilterObjectUser,
  RIGHTS,
  RoleOutput,
  UserOutput,
} from '@frachtwerk/essencium-types'
import {
  ActionIcon,
  Badge,
  Button,
  Flex,
  Group,
  Popover,
  Switch,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useDebouncedValue, useDisclosure } from '@mantine/hooks'
import {
  IconCheck,
  IconDotsVertical,
  IconLogout,
  IconPencil,
  IconTrash,
  IconUsers,
  IconX,
} from '@tabler/icons-react'
import {
  ColumnDef,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useAtom } from 'jotai'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo, useState } from 'react'

import { useDeleteUser, useGetUsers, useInvalidateToken } from '@/api'
import { userAtom } from '@/api/me'
import AuthLayout from '@/components/layouts/AuthLayout'
import { baseGetStaticProps } from '@/utils/next'

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
}

const DEFAULT_SORTING: SortingState = [{ id: 'firstName', desc: false }]

export function removeDuplicates(array: string[] | undefined): string[] {
  if (array) {
    return array.filter((item, index) => array.indexOf(item) === index)
  }
  return []
}

function UsersView(): JSX.Element {
  const router = useRouter()

  const [user] = useAtom(userAtom)

  const { t } = useTranslation()

  const theme = useMantineTheme()

  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false)
  const [userToBeDeleted, setUserToBeDeleted] = useState<UserOutput | null>(
    null,
  )

  const [activePage, setActivePage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORTING)
  const [columnFilters, setColumnFilters] = useState<FilterObjectUser>({
    name: null,
    email: null,
    role: null,
  })

  const [columnFiltersDebounced] = useDebouncedValue(columnFilters, 350)
  const [showFilter, setShowFilter] = useState(false)

  function handleFilterChange(
    key: FilterObjectUser['key'],
    value: FilterObjectUser['value'],
  ): void {
    // reset to first page when filtering
    setActivePage(1)

    setColumnFilters(prevFilters => ({
      ...prevFilters,
      [key as string]: value,
    }))
  }

  const {
    data: users,
    isError,
    isFetching,
    error,
    isInitialLoading,
    refetch: refetchUsers,
  } = useGetUsers({
    page: activePage - 1,
    size: pageSize,
    sort: parseSorting(sorting, DEFAULT_SORTING),
    filter: columnFiltersDebounced,
  })

  const handleRefetch = useCallback((): void => {
    refetchUsers()
  }, [refetchUsers])

  const handleEditUser = useCallback(
    (userToEdit: UserOutput) => {
      router.push(`/users/${userToEdit.id}`)
    },
    [router],
  )

  function getFilterData(): Record<string, Array<string>> {
    const { content: usersContent } = users || {}

    const name = usersContent?.map(
      userItem => `${userItem.firstName} ${userItem.lastName}`,
    )
    const email = usersContent?.map(userItem => userItem.email)
    const role = usersContent?.map(userItem => userItem.role.name)

    return {
      name: removeDuplicates(name),
      email: removeDuplicates(email),
      role: removeDuplicates(role),
    }
  }

  const { mutate: deleteUser } = useDeleteUser()

  const handleDeleteUser = useCallback(
    (userToDelete: UserOutput) => {
      deleteUser(userToDelete.id, {
        onSuccess: () => {
          refetchUsers()
          deleteModalHandlers.close()
        },
      })
    },
    [deleteUser, refetchUsers, deleteModalHandlers],
  )

  const { mutate: invalidateToken } = useInvalidateToken()

  const handleInvalidateToken = useCallback(
    (rowUser: UserOutput): void => {
      invalidateToken(rowUser.id)
    },
    [invalidateToken],
  )

  const columns = useMemo<ColumnDef<UserOutput>[]>(
    () => [
      {
        accessorKey: 'enabled',
        header: () => <Text>{t('usersView.table.active')}</Text>,
        cell: info => (info.getValue() ? <IconCheck /> : <IconX />),
        size: 80,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'name',
        header: () => <Text>{t('usersView.table.name')}</Text>,
        cell: info => {
          const rowUser = info.row.original
          return (
            <Text>
              {rowUser.firstName} {rowUser.lastName}
            </Text>
          )
        },
        size: 180,
      },

      {
        accessorKey: 'phone',
        header: () => <Text>{t('usersView.table.phone')}</Text>,
        cell: info => info.getValue(),
        size: 180,
        enableColumnFilter: false,
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
        enableColumnFilter: false,
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
        enableColumnFilter: false,
        cell: info => {
          const rowUser = info.row.original

          const isDefaultUser = rowUser.firstName === 'Admin'

          return (
            <Flex direction="row" gap="xs">
              {user?.role.rights
                .map(right => right.authority)
                .includes(RIGHTS.USER_UPDATE) ? (
                <ActionIcon
                  size="sm"
                  disabled={isDefaultUser}
                  variant="transparent"
                >
                  <IconPencil onClick={() => handleEditUser(rowUser)} />
                </ActionIcon>
              ) : null}

              {user?.role.rights
                .map(right => right.authority)
                .includes(RIGHTS.USER_DELETE) ? (
                <ActionIcon
                  size="sm"
                  disabled={isDefaultUser}
                  variant="transparent"
                >
                  <IconTrash
                    onClick={() => {
                      setUserToBeDeleted(rowUser)
                      deleteModalHandlers.open()
                    }}
                  />
                </ActionIcon>
              ) : null}

              {user?.role.rights
                .map(right => right.authority)
                .includes(RIGHTS.USER_UPDATE) ? (
                <Popover width={130} position="bottom" withArrow shadow="sm">
                  <Popover.Target>
                    <ActionIcon
                      size="sm"
                      disabled={isDefaultUser}
                      variant="transparent"
                    >
                      <IconDotsVertical />
                    </ActionIcon>
                  </Popover.Target>

                  <Popover.Dropdown p={0}>
                    <Group
                      onClick={() => handleInvalidateToken(user)}
                      spacing="xs"
                      sx={{
                        padding: '0.7rem 0 0.5rem 1rem',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor:
                            theme.colorScheme === 'dark'
                              ? theme.colors.gray[9]
                              : theme.colors.gray[0],
                        },
                      }}
                    >
                      <IconLogout
                        size={16}
                        color={
                          theme.colorScheme === 'dark'
                            ? theme.colors.gray[3]
                            : theme.colors.gray[7]
                        }
                      />

                      {t('usersView.table.invalidate')}
                    </Group>
                  </Popover.Dropdown>
                </Popover>
              ) : null}
            </Flex>
          )
        },
        size: 120,
      },
    ],
    [
      t,
      handleEditUser,
      user,
      theme.colors.gray,
      theme.colorScheme,
      handleInvalidateToken,
      deleteModalHandlers,
    ],
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

        <Switch
          label={t('table.misc.showFilter')}
          checked={showFilter}
          onChange={() => setShowFilter(!showFilter)}
          ml="auto"
        />

        <Flex ml="xl" align="center" gap="xs">
          {user?.role.rights
            .map(right => right.authority)
            .includes(RIGHTS.USER_CREATE) ? (
            <NextLink
              style={{ textDecoration: 'none', color: 'white' }}
              href="/users/add"
            >
              <Button>{t('usersView.action.add')}</Button>
            </NextLink>
          ) : null}
          <Button
            variant="light"
            onClick={() => {
              handleRefetch()
            }}
          >
            {t('usersView.action.refresh')}
          </Button>
        </Flex>
      </Flex>

      <>
        <DeleteDialog
          opened={deleteModalOpened}
          onClose={() => {
            deleteModalHandlers.close()
          }}
          deleteFunction={() => {
            if (userToBeDeleted) {
              handleDeleteUser(userToBeDeleted)
            }
          }}
          title={t('usersView.deleteDialog.title')}
          text={t('usersView.deleteDialog.text')}
        />

        <Table
          tableModel={table}
          onFilterChange={handleFilterChange}
          showFilter={showFilter}
          filterData={getFilterData()}
          filterValue={columnFilters}
          setFilterValue={setColumnFilters}
        />

        <TablePagination
          table={table}
          activePage={activePage}
          pageSize={pageSize}
          setActivePage={setActivePage}
          setPageSize={setPageSize}
          handleRefetch={handleRefetch}
        />
      </>
    </>
  )
}

UsersView.getLayout = function getLayout(page: React.ReactNode): JSX.Element {
  return (
    <AuthLayout routeName={getTranslation('navigation.users.label')}>
      {page}
    </AuthLayout>
  )
}

export const getStaticProps = baseGetStaticProps()

export default UsersView
