/* eslint-disable react/no-unstable-nested-components */
import {
  getTranslation,
  HttpNotification,
  parseSorting,
  Table,
  TablePagination,
} from '@frachtwerk/essencium-lib'
import {
  RightOutput,
  RIGHTS,
  RoleOutput,
  RoleUpdate,
} from '@frachtwerk/essencium-types'
import {
  Button,
  Center,
  Checkbox,
  Flex,
  Loader,
  Text,
  Title,
} from '@mantine/core'
import { IconShieldHalf } from '@tabler/icons-react'
import {
  ColumnDef,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useAtom } from 'jotai'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo, useState } from 'react'

import { userAtom } from '@/api/me'
import { useGetRights } from '@/api/rights'
import { useGetRoles, useUpdateRole } from '@/api/roles'
import AuthLayout from '@/components/layouts/AuthLayout'
import { baseGetStaticProps } from '@/utils/next'

const DEFAULT_SORTING: SortingState = [{ id: 'authority', desc: false }]

function RightsView(): JSX.Element {
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
    (rightAuthority: string, roleName: string) => {
      if (!roles?.content) {
        return false
      }

      const matchedRole = roles.content.find(role => role.name === roleName)

      if (!matchedRole)
        throw Error(`Role ${roleName} does not exist in ${roles.content}`)

      return matchedRole.rights.some(
        right => right.authority === rightAuthority
      )
    },
    [roles?.content]
  )

  // returns rights array for role after activating/deactivating a right
  function getUpdatedRights(
    role: RoleOutput,
    userRight: RightOutput
  ): RightOutput[] {
    const rightToUpdate = role.rights.find(
      right => right.authority === userRight.authority
    )

    if (rightToUpdate) {
      return role.rights.filter(
        right => right.authority !== userRight.authority
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
              .map(right => right.authority)
              .includes(RIGHTS.ROLE_UPDATE)
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
      })
    )

    return [
      {
        accessorKey: 'authority',
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
            <IconShieldHalf size="32" />
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

RightsView.getLayout = function getLayout(page: React.ReactNode): JSX.Element {
  return (
    <AuthLayout routeName={getTranslation('rightsView.title')}>
      {page}
    </AuthLayout>
  )
}

export const getStaticProps = baseGetStaticProps()

export default RightsView
