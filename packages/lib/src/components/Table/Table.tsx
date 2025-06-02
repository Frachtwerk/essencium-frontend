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

import {
  BasicEntityOutput,
  PaginatedResponse,
} from '@frachtwerk/essencium-types'
import { Flex, Table as MantineTable, TableProps } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import {
  flexRender,
  Header,
  Table as TanstackTable,
} from '@tanstack/react-table'
import { Dispatch, type JSX, SetStateAction } from 'react'

import { cn } from '../../utils'
import { TableHeader } from './components/TableHeader'

type Props<T> = TableProps & {
  tableModel: TanstackTable<T>
  onFilterChange?: (key: string, value: string | number | null) => void
  showFilter?: boolean
  filterData?: Record<string, Array<string | BasicEntityOutput>>
  filterValue?: Record<string, string | number | null>
  setFilterValue?: Dispatch<
    SetStateAction<Record<string, string | number | null>>
  >
  firstColSticky?: boolean
  setActivePage?: (activePage: PaginatedResponse<T>['number']) => void
}

export function Table<T>({
  tableModel,
  onFilterChange,
  showFilter,
  filterData,
  filterValue,
  setFilterValue,
  firstColSticky,
  setActivePage,
  ...props
}: Props<T>): JSX.Element {
  const [rowsDebounced] = useDebouncedValue(tableModel.getRowModel().rows, 150)

  function handleFilterChange(
    header: Header<T, unknown>,
    value: string | number | null,
  ): void {
    // reset to first page when filtering
    if (setActivePage) {
      setActivePage(1)
    }

    if (setFilterValue) {
      setFilterValue({
        ...filterValue,
        [header.column.id]: value,
      })
    }

    header.column.setFilterValue(value)

    onFilterChange?.(header.column.id, value)
  }

  return (
    <Flex className="flex-col items-end">
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <MantineTable
          striped
          highlightOnHover
          withRowBorders={false}
          {...props}
        >
          <TableHeader
            tableModel={tableModel}
            onFilterChange={handleFilterChange}
            showFilter={showFilter}
            filterData={filterData}
            filterValue={filterValue}
            firstColSticky={firstColSticky}
          />

          <MantineTable.Tbody aria-label="table-body">
            {(tableModel.getRowModel().rows.length
              ? tableModel.getRowModel().rows
              : rowsDebounced
            ).map(row => (
              <MantineTable.Tr
                key={row.id}
                onClick={
                  row.getToggleExpandedHandler() &&
                  row.getToggleExpandedHandler()
                }
                style={row.getCanExpand() ? { cursor: 'pointer' } : {}}
                className={cn(
                  firstColSticky &&
                    'dark:even:bg-dark-700 odd:bg-(--table-striped-color) even:bg-white',
                )}
              >
                {row.getVisibleCells().map(cell => (
                  <MantineTable.Td
                    key={cell.id}
                    width={cell.column.getSize()}
                    className={cn(
                      firstColSticky &&
                        'first:sticky first:left-0 first:z-10 first:bg-inherit',
                    )}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </MantineTable.Td>
                ))}
              </MantineTable.Tr>
            ))}
          </MantineTable.Tbody>

          <MantineTable.Tfoot aria-label="footer-row">
            {tableModel.getFooterGroups().map(footerGroup => (
              <MantineTable.Tr key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                  <MantineTable.Th key={header.id}>
                    {flexRender(
                      header.column.columnDef.footer,
                      header.getContext(),
                    )}
                  </MantineTable.Th>
                ))}
              </MantineTable.Tr>
            ))}
          </MantineTable.Tfoot>
        </MantineTable>
      </div>
    </Flex>
  )
}
