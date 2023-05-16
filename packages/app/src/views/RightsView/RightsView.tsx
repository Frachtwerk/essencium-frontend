/* eslint-disable react/no-unstable-nested-components */
import {
  Button,
  Center,
  Checkbox,
  Flex,
  Loader,
  Text,
  Title,
} from '@mantine/core'
import { IconShieldCheckFilled } from '@tabler/icons-react'
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
import { RightOutput, RIGHTS, RoleOutput, RoleUpdate } from 'types'

import { userAtom } from '@/api/me'
import { useGetRights } from '@/api/rights'
import { useGetRoles, useUpdateRole } from '@/api/roles'
import { parseSorting } from '@/utils/parseSorting'

const DEFAULT_SORTING: SortingState = [{ id: 'name', desc: false }]

export function RightsView(): JSX.Element {
  const { t } = useTranslation()

  const [user] = useAtom(userAtom)

  const [activePage, setActivePage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORTING)

  const {
    data: rights,
    isLoading: isLoadingRights,
    isFetching: isFetchingRights,
    isInitialLoading: isInitialLoadingRights,
    isError: isErrorRights,
    error: errorRights,
    refetch: refetchRights,
  } = useGetRights({
    page: activePage - 1,
    size: pageSize,
    sort: parseSorting(sorting, DEFAULT_SORTING),
  })

  const { data: roles, refetch: refetchRoles } = useGetRoles({
    page: activePage - 1,
    size: 9999,
    sort: 'name,asc',
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
    [handleRefetch, updateRole]
  )

  const hasRight = useCallback(
    (rightName: string, roleName: string) => {
      if (!roles?.content) {
        return false
      }

      const matchedRole = roles.content.find(role => role.name === roleName)

      if (!matchedRole)
        throw Error(`Role ${roleName} does not exist in ${roles.content}`)

      return matchedRole.rights.some(right => right.name === rightName)
    },
    [roles?.content]
  )

  // returns rights array for role after activating/deactivating a right
  function getUpdatedRights(
    role: RoleOutput,
    userRight: RightOutput
  ): RightOutput['id'][] {
    const rightToUpdate = role.rights.find(
      right => right.name === userRight.name
    )

    if (rightToUpdate) {
      return role.rights
        .filter(right => right.name !== userRight.name)
        .map(right => right.id)
    }

    return [...role.rights, { name: userRight.name, id: userRight.id }].map(
      right => right.id
    )
  }

  const columns = useMemo<ColumnDef<RightOutput>[]>(() => {
    const roleColumns: ColumnDef<RightOutput>[] = (roles?.content || []).map(
      role => ({
        accessorKey: `${role.name}`,
        size: 100,
        header: () => (
          <Text color={role.protected ? 'grey' : 'primary'}>
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
            !user?.role.rights
              .map(right => right.name)
              .includes(RIGHTS.ROLE_UPDATE)
          ) {
            return (
              <Checkbox disabled checked={hasRight(rightRow.name, role.name)} />
            )
          }

          return (
            <Checkbox
              onChange={() => handleUpdateRole(updatedRole)}
              checked={hasRight(rightRow.name, role.name)}
            />
          )
        },
      })
    )

    return [
      {
        accessorKey: 'name',
        header: () => <Text>{t('rightsView.table.name')}</Text>,
        cell: info => info.getValue(),
        size: 150,
      },
      ...roleColumns,
    ]
  }, [t, hasRight, handleUpdateRole, roles?.content, user])

  const table = useReactTable({
    data: rights?.content || [],
    columns,
    state: {
      sorting,
    },
    manualSorting: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: rights?.totalPages,
  })

  return (
    <>
      <HttpNotification
        isLoading={isFetchingRights && !isInitialLoadingRights}
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
            <IconShieldCheckFilled size="32" />
            <Text> {t('rightsView.title')}</Text>
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
