/* eslint-disable react/no-unstable-nested-components */
import {
  HttpNotification,
  LoadingSpinner,
  Table,
  TablePagination,
} from '@frachtwerk/essencium-lib'
import { RIGHTS, RoleOutput, UserOutput } from '@frachtwerk/essencium-types'
import {
  ActionIcon,
  Badge,
  Button,
  Center,
  Flex,
  Switch,
  Text,
  Title,
} from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
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
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useAtom } from 'jotai'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo, useState } from 'react'

import { useDeleteUser, useGetUsers } from '@/api'
import { userAtom } from '@/api/me'
import AuthLayout from '@/components/layouts/AuthLayout'
import { baseGetStaticProps } from '@/utils/baseGetStaticProps'
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

function UsersView(): JSX.Element {
  const router = useRouter()

  const [user] = useAtom(userAtom)

  const { t } = useTranslation()

  const [activePage, setActivePage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORTING)
  const [columnFilters, setColumnFilters] = useState({})
  const [columnFiltersDebounced] = useDebouncedValue(columnFilters, 350)
  const [showFilter, setShowFilter] = useState(false)

  function handleFilterChange(key: string, value: string): void {
    // reset to first page when filtering
    setActivePage(1)

    setColumnFilters(prevFilters => ({
      ...prevFilters,
      // map 'firstName' and 'lastName' to 'name' hence the API can only handle 'name'
      [key === 'firstName' || key === 'lastName' ? 'name' : key]: value,
    }))
  }

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
    filter: columnFiltersDebounced,
  })

  const handleRefetch = useCallback((): void => {
    refetchUsers()
  }, [refetchUsers])

  const handleEditUser = useCallback(
    (userToEdit: UserOutput) => {
      router.push(`/users/${userToEdit.id}`)
    },
    [router]
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
        enableColumnFilter: false,
      },
      {
        accessorKey: 'enabled',
        header: () => <Text>{t('usersView.table.active')}</Text>,
        cell: info => (info.getValue() ? <IconCheck /> : <IconX />),
        size: 60,
        enableColumnFilter: false,
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
                .map(right => right.name)
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
                .map(right => right.name)
                .includes(RIGHTS.USER_DELETE) ? (
                <ActionIcon
                  size="sm"
                  disabled={isDefaultUser}
                  variant="transparent"
                >
                  <IconTrash onClick={() => handleDeleteUser(rowUser)} />
                </ActionIcon>
              ) : null}

              <ActionIcon
                size="sm"
                disabled={isDefaultUser}
                variant="transparent"
              >
                <IconDotsVertical />
              </ActionIcon>
            </Flex>
          )
        },
        size: 120,
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
              <NextLink
                style={{ textDecoration: 'none', color: 'white' }}
                href="/users/add"
              >
                {t('usersView.action.add')}
              </NextLink>
            </Button>
          ) : null}
        </Flex>
      </Flex>

      {isLoading ? (
        <Center h="100%">
          <LoadingSpinner show delay={250} />
        </Center>
      ) : (
        <>
          <Table
            tableModel={table}
            onFilterChange={handleFilterChange}
            showFilter={showFilter}
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
      )}
    </>
  )
}

UsersView.getLayout = function getLayout(page: React.ReactNode): JSX.Element {
  return <AuthLayout>{page}</AuthLayout>
}

export const getStaticProps = baseGetStaticProps()

export default UsersView
