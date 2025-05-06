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

import { Flex, Select, Table as MantineTable, TextInput } from '@mantine/core'
import {
  IconArrowsSort,
  IconSortAscending2,
  IconSortDescending2,
  IconX,
} from '@tabler/icons-react'
import { flexRender, Header } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { type JSX } from 'react'

import classes from './TableHeaderColumn.module.css'

type Props<T> = {
  header: Header<T, unknown>
  onFilterChange: (header: Header<T, unknown>, value: string | null) => void
  showFilter?: boolean
  filterData?: Record<string, Array<string>>
  filterValue?: Record<string, string | null>
  firstColSticky?: boolean
}

export function TableHeaderColumn<T>({
  header,
  onFilterChange,
  showFilter,
  filterData,
  filterValue,
  firstColSticky,
}: Props<T>): JSX.Element {
  const { t } = useTranslation()

  return (
    <MantineTable.Th
      style={{ verticalAlign: 'top' }}
      className={firstColSticky ? classes['table__col-sticky'] : ''}
    >
      <Flex
        align="center"
        justify="flex-start"
        gap="sm"
        className={
          header.column.getCanSort() ? classes['table__col-header'] : ''
        }
        onClick={header.column.getToggleSortingHandler()}
        w={header.column.getSize()}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        {
          {
            asc: <IconSortAscending2 />,
            desc: <IconSortDescending2 />,
          }[(header.column.getIsSorted() as string) ?? null]
        }
        {!header.column.getIsSorted() && header.column.getCanSort() && (
          <IconArrowsSort className={classes['table__col-header--sortable']} />
        )}
      </Flex>

      {showFilter &&
        header.column.getCanFilter() &&
        (filterData && filterData[header.column.id] ? (
          <Select
            size="xs"
            className={classes.table__select}
            data={filterData[header.column.id] || []}
            placeholder={t('table.filter.placeholder')}
            searchable
            clearable
            value={
              filterValue?.[header.column.id] ||
              ((header.column.getFilterValue() ?? '') as string)
            }
            onChange={value => {
              onFilterChange(header, value)
            }}
          />
        ) : (
          <TextInput
            size="xs"
            className={classes['table__text-input']}
            value={
              filterValue?.[header.column.id] ||
              ((header.column.getFilterValue() ?? '') as string)
            }
            onChange={event => {
              onFilterChange(header, event.currentTarget.value)
            }}
            placeholder={t('table.filter.placeholder')}
            type="text"
            rightSection={
              filterValue?.[header.column.id] ||
              (header.column.getFilterValue() ?? '') ? (
                <IconX size={15} onClick={() => onFilterChange(header, null)} />
              ) : null
            }
          />
        ))}
    </MantineTable.Th>
  )
}
