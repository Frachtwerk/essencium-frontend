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

'use client'

import { PaginatedResponse } from '@frachtwerk/essencium-types'
import { Flex, Pagination, PaginationProps } from '@mantine/core'
import { Table as TanstackTable } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { type JSX, useEffect } from 'react'

import { SearchableSelect } from './SearchableSelect'

type CustomPaginationProps = Omit<PaginationProps, 'total'>

type Props<T> = CustomPaginationProps & {
  table?: TanstackTable<T>
  pageSize: PaginatedResponse<T>['size']
  pageCount?: PaginatedResponse<T>['totalPages']
  activePage: PaginatedResponse<T>['number']
  setPageSize: (pageSize: PaginatedResponse<T>['size']) => void
  setActivePage: (activePage: PaginatedResponse<T>['number']) => void
  fixedTablePageSize?: number
  jumpToLimit?: number
  pageSizeOptions?: string[]
}

export function TablePagination<T>({
  table,
  pageSize,
  pageCount,
  activePage,
  setPageSize,
  setActivePage,
  fixedTablePageSize,
  jumpToLimit,
  pageSizeOptions = ['10', '20', '30', '40', '50', '100'],
  ...props
}: Props<T>): JSX.Element {
  const { t } = useTranslation()

  useEffect(() => {
    if (!fixedTablePageSize) return

    if (table) {
      table.setPageSize(fixedTablePageSize)
    }

    setPageSize(fixedTablePageSize)
  }, [fixedTablePageSize, setPageSize, table])

  function handlePageJump(selectedPage: string): void {
    const enteredPageAsNumber = Number(selectedPage)

    if (
      enteredPageAsNumber > 0 &&
      enteredPageAsNumber <= (table ? table.getPageCount() : pageCount ?? 1)
    ) {
      setActivePage(enteredPageAsNumber)
    }
  }

  return (
    <Flex className="mt-xs items-center">
      <Flex className="mr-xl items-center">
        {!fixedTablePageSize ? (
          <>
            <label
              htmlFor="table-pagination-size-select"
              className="mr-xs text-sm"
            >
              {t('table.footer.pageSize')}
            </label>

            <SearchableSelect
              defaultValue={String(pageSize)}
              data={pageSizeOptions}
              className="w-[70px]"
              size="xs"
              id="table-pagination-size-select"
              onChange={e => {
                if (table) table.setPageSize(Number(e))

                setPageSize(Number(e))
                setActivePage(1)
              }}
            />
          </>
        ) : null}
      </Flex>

      <Pagination
        total={table ? table.getPageCount() : pageCount ?? 1}
        value={activePage}
        onChange={e => {
          setActivePage(e)
        }}
        getControlProps={control => {
          return {
            'aria-label': t(`table.footer.pagination.${control}`) as string,
          }
        }}
        {...props}
      />

      <SearchableSelect
        className="ml-xl"
        size="xs"
        aria-label={t('table.footer.pageGoTo') as string}
        placeholder={t('table.footer.pageGoTo') as string}
        classNames={{
          wrapper: 'w-[125px]',
        }}
        data={Array.from(
          { length: table ? table.getPageCount() : pageCount ?? 1 },
          (_, i) => String(i + 1),
        )}
        limit={jumpToLimit}
        onChange={value => {
          if (!value) return

          setActivePage(Number(value))

          handlePageJump(value)
        }}
        value={String(activePage)}
      />
    </Flex>
  )
}
