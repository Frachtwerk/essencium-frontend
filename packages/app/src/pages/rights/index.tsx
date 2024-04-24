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
  HttpNotification,
  LoadingSpinner,
  Table,
  TablePagination,
} from '@frachtwerk/essencium-lib'
import {
  RightOutput,
  RIGHTS,
  RoleOutput,
  RoleUpdate,
} from '@frachtwerk/essencium-types'
import { Button, Checkbox, Flex, Text, Title } from '@mantine/core'
import { IconShieldHalf } from '@tabler/icons-react'
import {
  ColumnDef,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useAtomValue } from 'jotai'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo, useState } from 'react'

import { useGetRights, useGetRoles, userRightsAtom, useUpdateRole } from '@/api'
import { AuthLayout } from '@/components/layouts'
import { getTranslation, hasRequiredRights, parseSorting } from '@/utils'
import { baseGetServerSideProps } from '@/utils/next'

const DEFAULT_SORTING: SortingState = [{ id: 'authority', desc: false }]

function RightsView(): JSX.Element {
  const { t } = useTranslation()

  const userRights = useAtomValue(userRightsAtom)

  const [activePage, setActivePage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORTING)

  const {
    data: rights,
    isLoading: isLoadingRights,
    isFetching: isFetchingRights,
    isError: isErrorRights,
    error: errorRights,
    refetch: refetchRights,
  } = useGetRights({
    page: activePage - 1,
    size: pageSize,
    sort: parseSorting(sorting, DEFAULT_SORTING),
  })

  const { data: roles, refetch: refetchRoles } = useGetRoles({
    requestConfig: {
      page: 0,
      size: 9999,
      sort: 'name,asc',
    },
  })

  const handleRefetch = useCallback((): void => {
    refetchRights()
    refetchRoles()
  }, [refetchRights, refetchRoles])

  const { mutate: updateRole } = useUpdateRole()

  const handleUpdateRole = useCallback(
    (updatedRole: RoleUpdate): void => {
      updateRole(updatedRole, {
        onSuccess: handleRefetch,
      })
    },
    [handleRefetch, updateRole],
  )

  const hasRight = useCallback(
    (rightAuthority: string, roleName: string) => {
      if (!roles?.content) {
        return false
      }

      const matchedRole = roles.content.find(role => role.name === roleName)

      if (!matchedRole)
        throw Error(`Role ${roleName} does not exist in ${roles.content}`)

      return matchedRole.rights.some(
        right => right.authority === rightAuthority,
      )
    },
    [roles?.content],
  )

  // returns rights array for role after activating/deactivating a right
  function getUpdatedRights(
    role: RoleOutput,
    userRight: RightOutput,
  ): RightOutput[] {
    const rightToUpdate = role.rights.find(
      right => right.authority === userRight.authority,
    )

    if (rightToUpdate) {
      return role.rights.filter(
        right => right.authority !== userRight.authority,
      )
    }

    return [
      ...role.rights,
      { authority: userRight.authority, description: userRight.description },
    ]
  }

  const columns = useMemo<ColumnDef<RightOutput>[]>(() => {
    const roleColumns: ColumnDef<RightOutput>[] = (roles?.content || []).map(
      role => ({
        accessorKey: `${role.name}`,
        size: 100,
        header: () => (
          <Text inherit c={role.protected ? 'grey' : 'primary'}>
            {t(`rightsView.table.${role.name}`)}
          </Text>
        ),
        enableSorting: false,
        cell: info => {
          const rightRow = info.row.original

          const updatedRole = {
            ...role,
            rights: getUpdatedRights(role, rightRow),
          }

          if (
            role.name === 'ADMIN' ||
            role.protected ||
            !hasRequiredRights(userRights, RIGHTS.ROLE_UPDATE) ||
            !hasRequiredRights(userRights, RIGHTS.RIGHT_UPDATE)
          ) {
            return (
              <Checkbox
                disabled
                checked={hasRight(rightRow.authority, role.name)}
              />
            )
          }

          return (
            <Checkbox
              onChange={() =>
                handleUpdateRole({
                  ...updatedRole,
                  rights: updatedRole.rights.map(right => right.authority),
                })
              }
              checked={hasRight(rightRow.authority, role.name)}
            />
          )
        },
      }),
    )

    return [
      {
        accessorKey: 'authority',
        header: () => <Text inherit>{t('rightsView.table.name')}</Text>,
        cell: info => info.getValue(),
        size: 150,
      },
      ...roleColumns,
    ]
  }, [t, hasRight, handleUpdateRole, roles?.content, userRights])

  const table = useReactTable({
    data: rights?.content || [],
    columns,
    state: {
      sorting,
    },
    manualSorting: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    pageCount: rights?.totalPages,
  })

  return (
    <>
      <HttpNotification
        isLoading={isFetchingRights && !isLoadingRights}
        isError={isErrorRights}
        errorTitle={`Error ${
          errorRights?.response?.status
            ? `(${errorRights?.response?.status})`
            : ''
        }`}
        errorMessage={errorRights?.message}
        loadingTitle={t('notifications.loadingAsyncData.title') as string}
        loadingMessage={t('notifications.loadingAsyncData.message') as string}
      />

      <Flex py="md" justify="space-between" align="center">
        <Title size="h2">
          <Flex align="center" gap={10}>
            <IconShieldHalf size="32" />
            <Text inherit> {t('rightsView.title')}</Text>
          </Flex>
        </Title>

        <Button
          variant="light"
          onClick={() => {
            handleRefetch()
          }}
        >
          {t('actions.refresh')}
        </Button>
      </Flex>

      {isLoadingRights ? (
        <LoadingSpinner show />
      ) : (
        <>
          <Table tableModel={table} firstColSticky />

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

RightsView.getLayout = function getLayout(
  page: React.ReactNode,
  version?: string,
): JSX.Element {
  return (
    <AuthLayout
      routeName={getTranslation('rightsView.title')}
      version={version}
    >
      {page}
    </AuthLayout>
  )
}

export const getServerSideProps = baseGetServerSideProps()

export default RightsView
