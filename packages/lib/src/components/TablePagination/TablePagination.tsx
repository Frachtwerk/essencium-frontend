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
import { Flex, Pagination, Select, Text } from '@mantine/core'
import { Table as TanstackTable } from '@tanstack/react-table'
import { useTranslation } from 'next-i18next'

type Props<T> = {
  table: TanstackTable<T>
  pageSize: PaginatedResponse<T>['size']
  activePage: PaginatedResponse<T>['number']
  setPageSize: (pageSize: PaginatedResponse<T>['size']) => void
  setActivePage: (activePage: PaginatedResponse<T>['number']) => void
  handleRefetch: () => void
}

export function TablePagination<T>({
  table,
  pageSize,
  activePage,
  setPageSize,
  setActivePage,
  handleRefetch,
}: Props<T>): JSX.Element {
  const { t } = useTranslation()

  return (
    <Flex align="center" mt="xs">
      <Flex align="center" mr="xl">
        <Text size="sm" mr="xs">
          {t('table.footer.pageSize')}
        </Text>

        <Select
          defaultValue={String(pageSize)}
          data={['10', '20', '30', '40', '50', '100']}
          w={70}
          onChange={e => {
            table.setPageSize(Number(e))
            setPageSize(Number(e))
            setActivePage(1)
            handleRefetch()
          }}
        />
      </Flex>

      <Pagination
        total={table.getPageCount()}
        value={activePage}
        onChange={e => {
          setActivePage(e)
          handleRefetch()
        }}
      />
    </Flex>
  )
}
