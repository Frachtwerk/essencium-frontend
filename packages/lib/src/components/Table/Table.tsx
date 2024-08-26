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

import { PaginatedResponse } from '@frachtwerk/essencium-types'
import {
  Flex,
  Loader,
  Table as MantineTable,
  TableProps,
  TextInput,
} from '@mantine/core'
import {
  IconSortAscending2,
  IconSortDescending2,
  IconX,
} from '@tabler/icons-react'
import {
  flexRender,
  Header,
  Table as TanstackTable,
} from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { Dispatch, SetStateAction } from 'react'

import classes from './Table.module.css'

type Props<T> = TableProps & {
  tableModel: TanstackTable<T>
  onFilterChange?: (key: string, value: string | null) => void
  showFilter?: boolean
  filterData?: Record<string, Array<string>>
  filterValue?: Record<string, string | null>
  setFilterValue?: Dispatch<SetStateAction<Record<string, string | null>>>
  firstColSticky?: boolean
  setActivePage?: (activePage: PaginatedResponse<T>['number']) => void
  isLoadingData?: boolean
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
  isLoadingData = false,
  ...props
}: Props<T>): JSX.Element {
  const { t } = useTranslation()

  function handleFilterChange(
    header: Header<T, unknown>,
    value: string | null,
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
    <Flex direction="column" align="end">
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <MantineTable
          striped
          highlightOnHover
          withRowBorders={false}
          {...props}
        >
          <MantineTable.Thead aria-label="header-row">
            {tableModel.getHeaderGroups().map(headerGroup => (
              <MantineTable.Tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <MantineTable.Th
                    key={header.id}
                    style={{ verticalAlign: 'top' }}
                    className={
                      firstColSticky ? classes['table__col-sticky'] : ''
                    }
                  >
                    <Flex
                      align="center"
                      justify="flex-start"
                      gap="sm"
                      className={
                        header.column.getCanSort()
                          ? classes['table__col-header--cursor-pointer']
                          : ''
                      }
                      onClick={header.column.getToggleSortingHandler()}
                      w={header.column.getSize()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                      {
                        {
                          asc: <IconSortAscending2 />,
                          desc: <IconSortDescending2 />,
                        }[(header.column.getIsSorted() as string) ?? null]
                      }
                    </Flex>

                    {showFilter && header.column.getCanFilter() ? (
                      <TextInput
                        size="xs"
                        className={classes['table__text-input']}
                        value={
                          (filterValue && filterValue[header.column.id]) ||
                          ((header.column.getFilterValue() ?? '') as string)
                        }
                        onChange={event => {
                          handleFilterChange(header, event.currentTarget.value)
                        }}
                        placeholder={t('table.filter.placeholder')}
                        type="text"
                        rightSection={
                          (filterValue && filterValue[header.column.id]) ||
                          ((header.column.getFilterValue() ?? '') as string) ? (
                            <IconX
                              size={15}
                              onClick={() => handleFilterChange(header, null)}
                            />
                          ) : null
                        }
                      />
                    ) : null}
                  </MantineTable.Th>
                ))}
              </MantineTable.Tr>
            ))}
          </MantineTable.Thead>

          <MantineTable.Tbody aria-label="table-body">
            {isLoadingData ? (
              <MantineTable.Tr>
                <MantineTable.Td>
                  <Loader size="xs" />
                </MantineTable.Td>
              </MantineTable.Tr>
            ) : (
              tableModel.getRowModel().rows.map(row => (
                <MantineTable.Tr
                  key={row.id}
                  className={
                    firstColSticky
                      ? classes['table__table-row--sticky']
                      : classes['table__table-row']
                  }
                >
                  {row.getVisibleCells().map(cell => (
                    <MantineTable.Td
                      key={cell.id}
                      width={cell.column.getSize()}
                      className={
                        firstColSticky ? classes['table__col-sticky'] : ''
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </MantineTable.Td>
                  ))}
                </MantineTable.Tr>
              ))
            )}
          </MantineTable.Tbody>

          <MantineTable.Tfoot
            aria-label="footer-row"
            className={classes['footer']}
          >
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
