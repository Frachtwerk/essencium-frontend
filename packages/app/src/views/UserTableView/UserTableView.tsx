import { Text } from '@mantine/core'
import { ColumnDef } from '@tanstack/react-table'
import { HttpNotification, User, UserTable } from 'lib'
import { useMemo } from 'react'

import { useGetUsers } from '@/api'

export function UserTableView(): JSX.Element {
  const { data: users, isError, isLoading, isFetching, error } = useGetUsers()

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
        isLoading={isLoading || isFetching}
        isError={isError}
        error={error}
      />

      <UserTable
        users={[...(users || []), ...(users || []).reverse()] || []}
        columns={columns}
      />
    </>
  )
}
