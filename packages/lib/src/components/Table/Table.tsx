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

import './Table.css'

import {
  Flex,
  Select,
  Table as MantineTable,
  useMantineTheme,
} from '@mantine/core'
import { IconSortAscending2, IconSortDescending2 } from '@tabler/icons-react'
import { flexRender, Table as TanstackTable } from '@tanstack/react-table'
import { Dispatch, SetStateAction } from 'react'

type Props<T> = {
  tableModel: TanstackTable<T>
  onFilterChange?: (key: string, value: string | null) => void
  showFilter?: boolean
  filterData?: Record<string, Array<string>>
  filterValue?: Record<string, string | null>
  setFilterValue?: Dispatch<SetStateAction<Record<string, string | null>>>
  firstColSticky?: boolean
}

export function Table<T>({
  tableModel,
  onFilterChange,
  showFilter,
  filterData,
  filterValue,
  setFilterValue,
  firstColSticky,
}: Props<T>): JSX.Element {
  const theme = useMantineTheme()

  return (
    <Flex direction="column" align="end">
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <MantineTable striped highlightOnHover>
          <thead aria-label="header-row">
            {tableModel.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    style={{ verticalAlign: 'top' }}
                    className={firstColSticky ? 'table__col--sticky' : ''}
                  >
                    <Flex
                      align="center"
                      justify="flex-start"
                      gap="sm"
                      sx={{
                        cursor: header.column.getCanSort()
                          ? 'pointer'
                          : 'default',
                        '&:hover': {
                          color: header.column.getCanSort()
                            ? theme.colors.blue[6]
                            : theme.colors.dark[4],
                        },
                      }}
                      onClick={header.column.getToggleSortingHandler()}
                      w={header.column.getSize()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {
                        {
                          asc: <IconSortAscending2 />,
                          desc: <IconSortDescending2 />,
                        }[(header.column.getIsSorted() as string) ?? null]
                      }
                    </Flex>

                    {showFilter && header.column.getCanFilter() ? (
                      <Select
                        size="xs"
                        my="xs"
                        data={filterData ? filterData[header.column.id] : []}
                        searchable
                        clearable
                        value={filterValue && filterValue[header.column.id]}
                        onChange={event => {
                          if (setFilterValue)
                            setFilterValue({
                              ...filterValue,
                              [header.column.id]: event,
                            })
                          header.column.setFilterValue(event)
                          onFilterChange?.(header.column.id, event)
                        }}
                      />
                    ) : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody aria-label="table-body">
            {tableModel.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                style={{
                  borderBottom: '2px solid white',
                  borderTop: '2px solid white',
                }}
                className={firstColSticky ? 'table__row--bg' : ''}
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    width={cell.column.getSize()}
                    className={firstColSticky ? 'table__col--sticky' : ''}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>

          <tfoot aria-label="footer-row">
            {tableModel.getFooterGroups().map(footerGroup => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map(header => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </MantineTable>
      </div>
    </Flex>
  )
}
