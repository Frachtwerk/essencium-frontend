/*
 * Copyright (C) 2023 Frachtwerk GmbH, Leopoldstraße 7C, 76133 Karlsruhe.
 *
 * This file is part of Essencium Frontend.
 *
 * Essencium Frontend is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Essencium Frontend is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Essencium Frontend. If not, see <http://www.gnu.org/licenses/>.
 */

import { Table as MantineTable, TableProps } from '@mantine/core'
import { Header, Table as TanstackTable } from '@tanstack/react-table'
import { type JSX } from 'react'

import { TableHeaderColumn } from './TableHeaderColumn'

type Props<T> = TableProps & {
  tableModel: TanstackTable<T>
  onFilterChange: (header: Header<T, unknown>, value: string | null) => void
  showFilter?: boolean
  filterData?: Record<string, Array<string>>
  filterValue?: Record<string, string | null>
  firstColSticky?: boolean
}

export function TableHeader<T>({
  tableModel,
  onFilterChange,
  showFilter,
  filterData,
  filterValue,
  firstColSticky,
}: Props<T>): JSX.Element {
  return (
    <MantineTable.Thead aria-label="header-row">
      {tableModel.getHeaderGroups().map(headerGroup => (
        <MantineTable.Tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <TableHeaderColumn
              key={header.id}
              header={header}
              onFilterChange={onFilterChange}
              showFilter={showFilter}
              filterData={filterData}
              filterValue={filterValue}
              firstColSticky={firstColSticky}
            />
          ))}
        </MantineTable.Tr>
      ))}
    </MantineTable.Thead>
  )
}
