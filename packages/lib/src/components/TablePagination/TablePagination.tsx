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
import { Flex, Pagination, PaginationProps, Text } from '@mantine/core'
import { Table as TanstackTable } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { type JSX, useEffect, useState } from 'react'

import { SearchableSelect } from './SearchableSelect'
import classes from './TablePagination.module.css'

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

  const [enteredPage, setEnteredPage] = useState('')

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
    <Flex
      align="center"
      className={classes['table-pagination__flex--margin-top']}
    >
      <Flex
        align="center"
        className={classes['table-pagination__flex--margin-right']}
      >
        {!fixedTablePageSize ? (
          <>
            <Text className={classes['table-pagination__text']}>
              {t('table.footer.pageSize')}
            </Text>

            <SearchableSelect
              defaultValue={String(pageSize)}
              data={pageSizeOptions}
              aria-label={t('table.footer.pageSize') as string}
              className={classes['table-pagination__select']}
              size="xs"
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
        {...props}
      />

      <SearchableSelect
        className={classes['table-pagination__go-to']}
        size="xs"
        aria-label={t('table.footer.pageGoTo') as string}
        placeholder={t('table.footer.pageGoTo') as string}
        classNames={{
          wrapper: classes['table-pagination__go-to-wrapper'],
        }}
        data={Array.from(
          { length: table ? table.getPageCount() : pageCount ?? 1 },
          (_, i) => String(i + 1),
        )}
        limit={jumpToLimit}
        onChange={value => {
          if (!value) return

          setEnteredPage(value)
          handlePageJump(value)
        }}
        value={enteredPage}
      />
    </Flex>
  )
}
