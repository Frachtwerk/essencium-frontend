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
  roles: T[]
  columns: ColumnDef<T>[]
}

export function Roles<T>({ roles, columns }: Props<T>): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: roles,
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
