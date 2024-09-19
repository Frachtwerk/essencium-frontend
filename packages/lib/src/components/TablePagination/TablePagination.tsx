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
import {
  ActionIcon,
  Flex,
  Pagination,
  PaginationProps,
  Select,
  Text,
  TextInput,
} from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { Table as TanstackTable } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

import classes from './TablePagination.module.css'

type CustomPaginationProps = Omit<PaginationProps, 'total'>

type Props<T> = CustomPaginationProps & {
  table: TanstackTable<T>
  pageSize: PaginatedResponse<T>['size']
  activePage: PaginatedResponse<T>['number']
  setPageSize: (pageSize: PaginatedResponse<T>['size']) => void
  setActivePage: (activePage: PaginatedResponse<T>['number']) => void
  handleRefetch: () => void
  fixedTablePageSize?: number
}

export function TablePagination<T>({
  table,
  pageSize,
  activePage,
  setPageSize,
  setActivePage,
  handleRefetch,
  fixedTablePageSize,
  ...props
}: Props<T>): JSX.Element {
  const { t } = useTranslation()

  const [enteredPage, setEnteredPage] = useState('')

  useEffect(() => {
    if (!fixedTablePageSize) return

    table.setPageSize(fixedTablePageSize)

    setPageSize(fixedTablePageSize)
  }, [fixedTablePageSize, setPageSize, table])

  function handlePageJump(): void {
    const enteredPageAsNumber = Number(enteredPage)

    if (
      enteredPageAsNumber > 0 &&
      enteredPageAsNumber <= table.getPageCount()
    ) {
      setActivePage(enteredPageAsNumber)
      handleRefetch()
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

            <Select
              defaultValue={String(pageSize)}
              data={['10', '20', '30', '40', '50', '100']}
              aria-label={t('table.footer.pageSize') as string}
              className={classes['table-pagination__select']}
              size="xs"
              onChange={e => {
                table.setPageSize(Number(e))
                setPageSize(Number(e))
                setActivePage(1)
                handleRefetch()
              }}
            />
          </>
        ) : null}
      </Flex>

      <Pagination
        total={table.getPageCount()}
        value={activePage}
        onChange={e => {
          setActivePage(e)
          handleRefetch()
        }}
        {...props}
      />

      <TextInput
        className={classes['table-pagination__go-to']}
        size="xs"
        aria-label={t('table.footer.pageGoTo') as string}
        placeholder={t('table.footer.pageGoTo') as string}
        classNames={{
          wrapper: classes['table-pagination__go-to-wrapper'],
        }}
        onChange={e => setEnteredPage(e.currentTarget.value)}
        value={enteredPage}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handlePageJump()
          }
        }}
        rightSection={
          <ActionIcon
            variant="subtle"
            aria-label={t('table.footer.pageGoTo') as string}
            size="md"
            color="gray"
            onClick={() => handlePageJump()}
          >
            <IconSearch style={{ width: '65%', height: '65%' }} stroke={1.25} />
          </ActionIcon>
        }
      />
    </Flex>
  )
}
