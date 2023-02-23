/* eslint-disable react/no-unstable-nested-components */
import { Center, Loader, Text } from '@mantine/core'
import { ColumnDef } from '@tanstack/react-table'
import { HttpNotification, User, UserTable } from 'lib'
import { useMemo } from 'react'

import { useGetUsers } from '@/api'

export function UserTableView(): JSX.Element {
  const {
    data: users,
    isError,
    isLoading,
    isFetching,
    error,
    isInitialLoading,
  } = useGetUsers()

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => <Text>ID</Text>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'name',
        header: () => <Text>Name</Text>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'username',
        header: () => <Text>Username</Text>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'email',
        header: () => <Text>E-Mail</Text>,
        cell: info => info.getValue(),
      },
    ],
    []
  )

  return (
    <>
      <HttpNotification
        isLoading={isFetching && !isInitialLoading}
        isError={isError}
        errorTitle={`Error ${
          error?.response?.status ? `(${error?.response?.status})` : ''
        }`}
        errorMessage={error?.message}
        loadingTitle="Loading..."
        loadingMessage="Retrieving data from the server"
      />

      {isLoading ? (
        <Center h="100%">
          <Loader size="xl" name="loader" />
        </Center>
      ) : (
        <UserTable users={users || []} columns={columns} />
      )}
    </>
  )
}
