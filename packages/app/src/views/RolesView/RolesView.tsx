/* eslint-disable react/no-unstable-nested-components */
import { Badge, Button, Center, Flex, Loader, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconUserCheck } from '@tabler/icons-react'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useAtom } from 'jotai'
import { AddRole, HttpNotification, Table, TablePagination } from 'lib'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RightOutput, RIGHTS, RoleOutput } from 'types'

import { userAtom } from '@/api/me'
import { useGetRights } from '@/api/rights'
import { useCreateRole, useGetRoles } from '@/api/roles'
import { parseSorting } from '@/utils/parseSorting'

const DEFAULT_SORTING: SortingState = [{ id: 'name', desc: false }]

export function RolesView(): JSX.Element {
  const { t } = useTranslation()

  const [user] = useAtom(userAtom)

  const [modalOpened, modalHandlers] = useDisclosure(false)

  const [activePage, setActivePage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORTING)

  const {
    data: roles,
    isLoading: isLoadingRoles,
    isFetching: isFetchingRoles,
    isInitialLoading: isInitialLoadingRoles,
    isError: isErrorRoles,
    error: errorRoles,
    refetch: refetchRoles,
  } = useGetRoles({
    page: activePage - 1,
    size: pageSize,
    sort: parseSorting(sorting, DEFAULT_SORTING),
  })

  const { data: rights } = useGetRights({ page: 0, size: 9999 })

  const { mutate: createRole } = useCreateRole()

  const handleRefetch = useCallback((): void => {
    refetchRoles()
  }, [refetchRoles])

  const columns = useMemo<ColumnDef<RoleOutput>[]>(() => {
    return [
      {
        accessorKey: 'name',
        header: () => <Text>{t('rolesView.table.name')}</Text>,
        cell: info => info.getValue(),
        size: 120,
      },
      {
        accessorKey: 'description',
        header: () => <Text>{t('rolesView.table.description')}</Text>,
        cell: info => info.getValue(),
        size: 200,
      },
      {
        accessorKey: 'rights',
        header: () => <Text>{t('rolesView.table.rights')}</Text>,
        size: 600,
        cell: info => (
          <>
            {(info.getValue() as RightOutput[]).map((right: RightOutput) => (
              <Badge
                key={right.id}
                variant="outline"
                color="orange"
                style={{ margin: 3 }}
              >
                {right.name}
              </Badge>
            ))}
          </>
        ),
      },
    ]
  }, [t])

  const table = useReactTable({
    data: roles?.content || [],
    columns,
    state: {
      sorting,
    },
    manualSorting: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: roles?.totalPages,
  })

  return (
    <>
      <HttpNotification
        isLoading={isFetchingRoles && !isInitialLoadingRoles}
        isError={isErrorRoles}
        errorTitle={`Error ${
          errorRoles?.response?.status
            ? `(${errorRoles?.response?.status})`
            : ''
        }`}
        errorMessage={errorRoles?.message}
        loadingTitle={t('notifications.loadingAsyncData.title') as string}
        loadingMessage={t('notifications.loadingAsyncData.message') as string}
      />

      <Flex py="md" justify="space-between" align="center">
        <Title size="h2">
          <Flex align="center" gap={10}>
            <IconUserCheck size="32" />

            <Text>{t('rolesView.title')}</Text>
          </Flex>
        </Title>

        <Flex align="center" gap="xs">
          <Button
            variant="light"
            onClick={() => {
              handleRefetch()
            }}
          >
            {t('actions.refresh')}
          </Button>

          {user?.role.rights
            .map(right => right.name)
            .includes(RIGHTS.ROLE_CREATE) ? (
            <Button onClick={() => modalHandlers.open()}>
              {t('rolesView.action.add')}
            </Button>
          ) : null}
        </Flex>
      </Flex>

      <AddRole
        opened={modalOpened}
        onClose={() => modalHandlers.close()}
        closeOnClickOutside={false}
        closeOnEscape
        size="xl"
        rights={rights?.content || []}
        handleCreateRole={createRole}
      />

      {isLoadingRoles ? (
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
