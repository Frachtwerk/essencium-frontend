import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import { Table } from '../Table'

type Props<T> = {
  users: T[]
  columns: ColumnDef<T>[]
}

export function UserTable<T>({ users, columns }: Props<T>): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: users,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return <Table tableModel={table} />
}
