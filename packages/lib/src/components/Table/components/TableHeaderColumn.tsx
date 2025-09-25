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

import 'dayjs/locale/de'

import { BasicEntityOutput, TABLEFILTERTYPE } from '@frachtwerk/essencium-types'
import {
  Flex,
  MultiSelect,
  Select,
  Table as MantineTable,
  TextInput,
} from '@mantine/core'
import { DatesRangeValue, DateValue, MonthPickerInput } from '@mantine/dates'
import {
  IconArrowsSort,
  IconSortAscending2,
  IconSortDescending2,
  IconX,
} from '@tabler/icons-react'
import { Column, flexRender, Header } from '@tanstack/react-table'
import dayjs from 'dayjs'
import { useTranslation } from 'next-i18next'
import { type JSX } from 'react'

import { cn } from '../../../utils'

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue = unknown> {
    filterType?: TABLEFILTERTYPE
  }
}

type InputProps<T> = {
  header: Header<T, unknown>
  onFilterChange: (
    header: Header<T, unknown>,
    value: string | number | null,
  ) => void
  filterData?: Record<string, Array<string | BasicEntityOutput>>
  filterValue?: Record<string, string | number | null>
}

type Props<T> = InputProps<T> & {
  showFilter?: boolean
  firstColSticky?: boolean
}

function getFilterType<T>(
  column: Column<T, unknown>,
  filterData?: Record<string, Array<string | BasicEntityOutput>>,
): TABLEFILTERTYPE {
  if (
    !filterData?.[column.id] &&
    column.columnDef.meta?.filterType !== TABLEFILTERTYPE.MONTH_PiCKER
  ) {
    return TABLEFILTERTYPE.TEXT
  }
  return column.columnDef.meta?.filterType
    ? column.columnDef.meta?.filterType
    : TABLEFILTERTYPE.SELECT
}

export function FilterInput<T>({
  header,
  onFilterChange,
  filterData,
  filterValue,
}: InputProps<T>): JSX.Element | null {
  const { t, i18n } = useTranslation()
  const filterType = getFilterType(header.column, filterData)
  const filterOptions = filterData?.[header.column.id] || []
  // Helper to map filter options to Mantine format
  const mapToSelectData = (
    data: Array<string | BasicEntityOutput>,
  ): Array<{ value: string; label: string }> =>
    data.map(option =>
      typeof option === 'string'
        ? { value: option, label: option }
        : { value: String(option.id), label: option.name },
    )
  const parsedFilterValue =
    filterValue?.[header.column.id] ||
    ((header.column.getFilterValue() ?? '') as string)

  switch (filterType) {
    case TABLEFILTERTYPE.TEXT:
      return (
        <TextInput
          className="my-xs"
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
      )
    case TABLEFILTERTYPE.SELECT:
      return (
        <Select
          className="my-xs"
          data={mapToSelectData(filterOptions)}
          placeholder={t('table.filter.placeholder')}
          searchable
          clearable
          value={
            filterValue?.[header.column.id]?.toString() ||
            ((header.column.getFilterValue() ?? '') as string)
          }
          onChange={value => {
            onFilterChange(header, value)
          }}
        />
      )
    case TABLEFILTERTYPE.MULTI_SELECT:
      return (
        <MultiSelect
          className="my-xs"
          data={mapToSelectData(filterOptions)}
          placeholder={t('table.filter.placeholder')}
          searchable
          clearable
          value={
            typeof parsedFilterValue === 'string' && parsedFilterValue.length
              ? parsedFilterValue.split(',')
              : []
          }
          onChange={value => {
            onFilterChange(header, value.join(','))
          }}
        />
      )
    case TABLEFILTERTYPE.MONTH_PiCKER:
      return (
        <MonthPickerInput
          locale={i18n.language}
          className="my-xs"
          placeholder={t('table.filter.placeholder')}
          valueFormat="MM.YYYY"
          type="range"
          allowSingleDateInRange
          value={
            header.column.getFilterValue() as
              | DatesRangeValue<DateValue>
              | undefined
          }
          onChange={value => {
            let [start, end] = value

            if (start && end) {
              const startDay = dayjs(start)

              const endDay = dayjs(end)

              start = startDay.startOf('month').format('YYYY-MM-DD')

              end = endDay.endOf('month').format('YYYY-MM-DD')
            }

            header.column.setFilterValue([start, end])
          }}
          clearable
          clearButtonProps={{
            onClick: () => header.column.setFilterValue([undefined, undefined]),
          }}
        />
      )
    default:
      return null
  }
}

export function TableHeaderColumn<T>({
  header,
  onFilterChange,
  showFilter,
  filterData,
  filterValue,
  firstColSticky,
}: Props<T>): JSX.Element {
  return (
    <MantineTable.Th
      className={cn(
        'align-top',
        firstColSticky &&
          'first:dark:bg-dark-700 first:sticky first:left-0 first:z-10 first:bg-white',
      )}
      scope="col"
    >
      <Flex
        className={cn(
          'gap-sm items-center justify-start',
          header.column.getCanSort() && 'group cursor-pointer',
        )}
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
          <IconArrowsSort className="opacity-0 group-hover:opacity-100" />
        )}
      </Flex>

      {showFilter && header.column.getCanFilter() && (
        <FilterInput
          header={header}
          onFilterChange={onFilterChange}
          filterData={filterData}
          filterValue={filterValue}
        />
      )}
    </MantineTable.Th>
  )
}
