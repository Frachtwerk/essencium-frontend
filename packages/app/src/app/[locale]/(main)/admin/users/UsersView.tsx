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
  TABLEFILTERTYPE,
  UserOutput,
  UserSource,
} from '@frachtwerk/essencium-types'
import {
  ActionIcon,
  Badge,
  Button,
  Flex,
  Menu,
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
import { type JSX, useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  useDeleteUser,
  useGetRoles,
  useGetUsers,
  useInvalidateToken,
  userRightsAtom,
} from '@/api'
import { parseSorting } from '@/utils'

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

const DEFAULT_SORTING: SortingState = [{ id: 'name', desc: false }]

export default function UsersView(): JSX.Element {
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

  const { data: allRoles } = useGetRoles({
    pagination: {
      page: 0,
      size: 2000,
      sort: 'name,asc',
    },
  })

  function getFilterRolesData(): Record<string, Array<string>> {
    const roles = allRoles?.content.map(role => role.name) || []

    return {
      roles,
    }
  }

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    isFetching: isFetchingUsers,
    error: errorUsers,
  } = useGetUsers({
    pagination: {
      page: activePage - 1,
      size: pageSize,
      sort: parseSorting(sorting, DEFAULT_SORTING),
    },
    filter: columnFiltersDebounced.reduce(
      (acc, { id, value }) => ({ ...acc, [id]: value }),
      {},
    ),
  })

  const { mutate: deleteUser } = useDeleteUser()

  const handleDeleteUser = useCallback(
    (userToDelete: UserOutput) => {
      if (!userToDelete.id) {
        throw new Error('User ID is undefined')
      }

      deleteUser(userToDelete.id, {
        onSettled() {
          deleteModalHandlers.close()
        },
      })
    },
    [deleteUser, deleteModalHandlers],
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
        header: () => <Text inherit>{t('usersView.table.active.title')}</Text>,
        cell: info =>
          info.getValue() ? (
            <IconUserCheck
              color="var(--mantine-color-green-8)"
              aria-label={t('usersView.table.active.isActive')}
            />
          ) : (
            <IconUserX
              color="var(--mantine-color-red-8)"
              aria-label={t('usersView.table.active.isInactive')}
            />
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
            <Flex className="items-center">
              <Text inherit>
                {rowUser.firstName} {rowUser.lastName}
              </Text>

              {isSso ? (
                <Badge
                  variant="light"
                  size="xs"
                  className="ml-[calc(var(--spacing-xs)/2)]"
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
              <Badge variant="outline" key={role.name} className="mr-xs">
                {role.name}
              </Badge>
            )
          })
        },
        size: 120,
        meta: {
          filterType: TABLEFILTERTYPE.MULTI_SELECT,
        },
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
            <Flex className="gap-xs flex-row">
              {hasRequiredRights(userRights, RIGHTS.USER_UPDATE) ? (
                <ActionIcon
                  component={NextLink}
                  href={`/admin/users/${rowUser.id}`}
                  className="disabled:bg-transparent"
                  size="sm"
                  disabled={isDefaultUser}
                  variant="transparent"
                  aria-label={t('usersView.action.edit')}
                >
                  <IconPencil aria-hidden />
                </ActionIcon>
              ) : null}

              {hasRequiredRights(userRights, RIGHTS.USER_DELETE) ? (
                <ActionIcon
                  className="disabled:bg-transparent"
                  size="sm"
                  disabled={isDefaultUser}
                  variant="transparent"
                  onClick={() => {
                    setUserToBeDeleted(rowUser)
                    deleteModalHandlers.open()
                  }}
                  aria-label={t('usersView.action.delete')}
                >
                  <IconTrash aria-hidden />
                </ActionIcon>
              ) : null}

              {hasRequiredRights(userRights, RIGHTS.USER_UPDATE) ? (
                <Menu position="bottom" withArrow>
                  <Menu.Target>
                    <ActionIcon
                      className="disabled:bg-transparent"
                      size="sm"
                      disabled={isDefaultUser}
                      variant="transparent"
                      aria-label={t('usersView.action.additionalActions')}
                    >
                      <IconDotsVertical aria-hidden />
                    </ActionIcon>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Item
                      onClick={() => handleInvalidateToken(rowUser)}
                      leftSection={<IconLogout size={16} />}
                    >
                      {t('usersView.table.invalidate')}
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              ) : null}
            </Flex>
          )
        },
        size: 120,
      },
    ],
    [
      t,
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

      <Flex className="py-md items-center justify-between">
        <Title order={2}>
          <Flex className="gap-xs items-center">
            <IconUsers className="size-8" />

            <Text inherit>{t('usersView.title')}</Text>
          </Flex>
        </Title>

        <Switch
          label={t('table.misc.showFilter')}
          checked={showFilter}
          onChange={() => setShowFilter(!showFilter)}
          className="ml-auto"
        />

        <Flex className="ml-xl gap-xs items-center">
          {hasRequiredRights(userRights, RIGHTS.USER_CREATE) ? (
            <Button component={NextLink} href="/admin/users/add">
              {t('usersView.action.add')}
            </Button>
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
