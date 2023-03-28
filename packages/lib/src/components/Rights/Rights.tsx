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
  rights: T[]
  columns: ColumnDef<T>[]
}

export function Rights<T>({ rights, columns }: Props<T>): JSX.Element {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: rights,
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
