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

/* eslint-disable react/no-unstable-nested-components */
import {
  DeleteDialog,
  hasRequiredRights,
  HttpNotification,
  LoadingSpinner,
  Table,
  TablePagination,
} from '@frachtwerk/essencium-lib'
import {
  RIGHTS,
  ROLES,
  UserOutput,
  UserSource,
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
} from '@mantine/core'
import { useDebouncedValue, useDisclosure } from '@mantine/hooks'
import {
  IconDotsVertical,
  IconLogout,
  IconPencil,
  IconTrash,
  IconUserCheck,
  IconUsers,
  IconUserX,
} from '@tabler/icons-react'
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useAtomValue } from 'jotai'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { type JSX, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  useDeleteUser,
  useGetUsers,
  useInvalidateToken,
  userRightsAtom,
} from '@/api'
import { parseSorting } from '@/utils'

import classes from './Users.module.css'

export const FORM_DEFAULTS_USERS_VIEW = {
  firstName: '',
  lastName: '',
  phone: '',
  mobile: '',
  email: '',
  password: '',
  enabled: true,
  locale: 'de',
  roles: [ROLES.USER],
}

const DEFAULT_SORTING: SortingState = [{ id: 'firstName', desc: false }]

export function removeDuplicates(array: string[] | undefined): string[] {
  if (array) {
    return array.filter((item, index) => array.indexOf(item) === index)
  }
  return []
}

export default function UsersView(): JSX.Element {
  const router = useRouter()

  const userRights = useAtomValue(userRightsAtom)

  const defaultUserEmail = process.env.NEXT_PUBLIC_DISABLE_INSTRUMENTATION
    ? process.env.NEXT_PUBLIC_DEFAULT_USER_EMAIL
    : window?.runtimeConfig?.optional?.DEFAULT_USER_EMAIL

  const { t } = useTranslation()

  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false)
  const [userToBeDeleted, setUserToBeDeleted] = useState<UserOutput | null>(
    null,
  )

  const [activePage, setActivePage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORTING)

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const [columnFiltersDebounced] = useDebouncedValue(columnFilters, 350)
  const [showFilter, setShowFilter] = useState(false)

  const { data: allUsers } = useGetUsers({
    page: 0,
    size: 9999,
  })

  function getFilterRolesData(): Record<string, Array<string>> {
    const { content: usersContent } = allUsers || {}

    const roles = usersContent?.flatMap(userItem =>
      userItem.roles.map(role => role.name),
    )

    return {
      roles: removeDuplicates(roles),
    }
  }

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    isFetching: isFetchingUsers,
    error: errorUsers,
    refetch: refetchUsers,
  } = useGetUsers({
    page: activePage - 1,
    size: pageSize,
    sort: parseSorting(sorting, DEFAULT_SORTING),
    filter: columnFiltersDebounced.reduce(
      (acc, { id, value }) => ({ ...acc, [id]: value }),
      {},
    ),
  })

  const handleEditUser = useCallback(
    (userToEdit: UserOutput) => {
      router.push(`/admin/users/${userToEdit.id}`)
    },
    [router],
  )

  const { mutate: deleteUser } = useDeleteUser()

  const handleDeleteUser = useCallback(
    (userToDelete: UserOutput) => {
      deleteUser(userToDelete.id, {
        onSuccess: () => {
          deleteModalHandlers.close()
          refetchUsers()
        },
        onError: () => {
          deleteModalHandlers.close()
        },
      })
    },
    [deleteUser, refetchUsers, deleteModalHandlers],
  )

  const { mutate: invalidateToken } = useInvalidateToken()

  const handleInvalidateToken = useCallback(
    (rowUser: UserOutput | null): void => {
      invalidateToken(rowUser?.id)
    },
    [invalidateToken],
  )

  const columns = useMemo<ColumnDef<UserOutput>[]>(
    () => [
      {
        accessorKey: 'enabled',
        header: () => <Text inherit>{t('usersView.table.active')}</Text>,
        cell: info =>
          info.getValue() ? (
            <IconUserCheck color="#2f9e44" />
          ) : (
            <IconUserX color="#e03131" />
          ),
        size: 80,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'name',
        header: () => <Text inherit>{t('usersView.table.name')}</Text>,
        cell: info => {
          const rowUser = info.row.original

          const isSso = rowUser.source !== UserSource.LOCAL

          const ssoProvider = rowUser.source

          return (
            <Flex align="center">
              <Text inherit>
                {rowUser.firstName} {rowUser.lastName}
              </Text>

              {isSso ? (
                <Badge
                  variant="light"
                  size="xs"
                  className={classes['userView__nameCol--badge']}
                >
                  {ssoProvider}
                </Badge>
              ) : null}
            </Flex>
          )
        },
        size: 180,
      },
      {
        accessorKey: 'phone',
        header: () => <Text inherit>{t('usersView.table.phone')}</Text>,
        cell: info => info.getValue(),
        size: 180,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'email',
        header: () => <Text inherit>{t('usersView.table.email')}</Text>,
        cell: info => info.getValue(),
        size: 230,
        maxSize: 250,
      },
      {
        accessorKey: 'locale',
        header: () => <Text inherit>{t('usersView.table.locale')}</Text>,
        cell: info => t(`${info.getValue()}`),
        size: 120,
        enableColumnFilter: false,
      },
      {
        accessorKey: 'roles',
        header: () => <Text inherit>{t('usersView.table.roles')}</Text>,
        cell: info => {
          const rowRoles = info.row.original.roles
          return rowRoles.map(role => {
            return (
              <Badge
                variant="outline"
                key={role.name}
                className={classes['userView__rolesCol--badge']}
              >
                {role.name}
              </Badge>
            )
          })
        },
        size: 120,
      },
      {
        accessorKey: 'actions',
        header: () => <Text inherit>{t('usersView.table.actions')}</Text>,
        enableSorting: false,
        enableColumnFilter: false,
        cell: info => {
          const rowUser = info.row.original

          const isDefaultUser = rowUser.email === defaultUserEmail

          return (
            <Flex direction="row" gap="xs">
              {hasRequiredRights(userRights, RIGHTS.USER_UPDATE) ? (
                <ActionIcon
                  className={classes['userView__actionsCellIcon--disabled']}
                  size="sm"
                  disabled={isDefaultUser}
                  variant="transparent"
                >
                  <IconPencil onClick={() => handleEditUser(rowUser)} />
                </ActionIcon>
              ) : null}

              {hasRequiredRights(userRights, RIGHTS.USER_DELETE) ? (
                <ActionIcon
                  className={classes['userView__actionsCellIcon--disabled']}
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

              {hasRequiredRights(userRights, RIGHTS.USER_UPDATE) ? (
                <Popover width={130} position="bottom" withArrow shadow="sm">
                  <Popover.Target>
                    <ActionIcon
                      className={classes['userView__actionsCellIcon--disabled']}
                      size="sm"
                      disabled={isDefaultUser}
                      variant="transparent"
                    >
                      <IconDotsVertical />
                    </ActionIcon>
                  </Popover.Target>

                  <Popover.Dropdown p={0}>
                    <Group
                      onClick={() => handleInvalidateToken(rowUser)}
                      gap="xs"
                      className={classes['userView__invalidateTokenGroup']}
                    >
                      <IconLogout
                        size={16}
                        className={classes['userView__logoutIcon']}
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
      userRights,
      defaultUserEmail,
      handleInvalidateToken,
      deleteModalHandlers,
    ],
  )

  const table = useReactTable({
    data: users?.content || [],
    columns,
    state: {
      sorting,
      columnFilters,
    },
    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    enableColumnFilters: showFilter,
    getCoreRowModel: getCoreRowModel(),
    pageCount: users?.totalPages,
  })

  return (
    <>
      <HttpNotification
        isLoading={isFetchingUsers && !isLoadingUsers}
        isError={isErrorUsers}
        errorTitle={`Error ${
          errorUsers?.response?.status
            ? `(${errorUsers?.response?.status})`
            : ''
        }`}
        errorMessage={errorUsers?.message}
        loadingTitle={t('notifications.loadingAsyncData.title') as string}
        loadingMessage={t('notifications.loadingAsyncData.message') as string}
      />

      <Flex
        className={classes['userView__header']}
        justify="space-between"
        align="center"
      >
        <Title size="h2">
          <Flex align="center" gap={10}>
            <IconUsers size="32" />

            <Text inherit>{t('usersView.title')}</Text>
          </Flex>
        </Title>

        <Switch
          label={t('table.misc.showFilter')}
          checked={showFilter}
          onChange={() => setShowFilter(!showFilter)}
          className={classes['userView__showFilterSwitch']}
        />

        <Flex
          className={classes['userView__buttonsSection']}
          align="center"
          gap="xs"
        >
          {hasRequiredRights(userRights, RIGHTS.USER_CREATE) ? (
            <NextLink href="/admin/users/add">
              <Button>{t('usersView.action.add')}</Button>
            </NextLink>
          ) : null}
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

        {isLoadingUsers && !columnFilters.length ? (
          <LoadingSpinner show />
        ) : (
          <>
            <Table
              tableModel={table}
              setActivePage={setActivePage}
              filterData={getFilterRolesData()}
              showFilter
            />

            <TablePagination
              table={table}
              activePage={activePage}
              pageSize={pageSize}
              setActivePage={setActivePage}
              setPageSize={setPageSize}
            />
          </>
        )}
      </>
    </>
  )
}
