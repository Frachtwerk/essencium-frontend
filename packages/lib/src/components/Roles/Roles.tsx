import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'
import { RoleOutput } from 'types'

import { Table } from '../Table'

type Props = {
  roles: RoleOutput[]
  columns: ColumnDef<RoleOutput>[]
}

export function Roles({ roles, columns }: Props): JSX.Element {
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
