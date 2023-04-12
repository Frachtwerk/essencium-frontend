/* eslint-disable react/no-unstable-nested-components */
import {
  Badge,
  Button,
  Center,
  Flex,
  Loader,
  Pagination,
  Select,
  Text,
  Title,
} from '@mantine/core'
import { IconUserCheck } from '@tabler/icons-react'
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { HttpNotification, Table } from 'lib'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RightOutput, RoleOutput } from 'types'

import { useGetRoles } from '@/api/roles'

export function RolesView(): JSX.Element {
  const { t } = useTranslation()

  const [activePage, setActivePage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [sorting, setSorting] = useState<SortingState>([])

  const {
    data: roles,
    isLoading: isLoadingRoles,
    isFetching: isFetchingRoles,
    isInitialLoading: isInitialLoadingRoles,
    isError: isErrorRoles,
    error: errorRoles,
    refetch: refetchRoles,
  } = useGetRoles(activePage - 1, pageSize)

  const handleRefetch = useCallback((): void => {
    refetchRoles()
  }, [refetchRoles])

  const columns = useMemo<ColumnDef<RoleOutput>[]>(() => {
    return [
      {
        accessorKey: 'name',
        header: () => <Text>{t('rolesView.table.name')}</Text>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'description',
        header: () => <Text>{t('rolesView.table.description')}</Text>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'rights',
        header: () => <Text>{t('rolesView.table.rights')}</Text>,
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
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
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
            <Text> {t('rolesView.title')}</Text>
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

          <Button onClick={() => {}}>{t('rolesView.action.add')}</Button>
        </Flex>
      </Flex>

      {isLoadingRoles ? (
        <Center h="100%">
          <Loader size="xl" name="loader" />
        </Center>
      ) : (
        <>
          <Table tableModel={table} />

          <Flex align="center">
            <Text size="sm" mr="xl">
              {t('table.footer.pageCount')} {table.getPageCount()}
            </Text>

            <Flex align="center" mr="xl">
              <Text size="sm" mr="xs">
                {t('table.footer.pageSize')}
              </Text>

              <Select
                defaultValue={String(pageSize)}
                data={['10', '20', '30', '40', '50', '100']}
                w={70}
                onChange={e => {
                  table.setPageSize(Number(e))
                  setPageSize(Number(e))
                  setActivePage(1)
                  handleRefetch()
                }}
              />
            </Flex>

            <Pagination
              total={table.getPageCount()}
              value={activePage}
              onChange={e => {
                setActivePage(e)
                handleRefetch()
              }}
            />
          </Flex>
        </>
      )}
    </>
  )
}
