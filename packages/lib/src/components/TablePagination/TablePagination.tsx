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
    <Flex align="center">
      <Flex align="center" mr="xl">
        <Text size="sm" mt="xs" mr="xs">
          {t('table.footer.pageSize')}
        </Text>

        <Select
          defaultValue={String(pageSize)}
          data={['10', '20', '30', '40', '50', '100']}
          w={70}
          mt="xs"
          onChange={e => {
            table.setPageSize(Number(e))
            setPageSize(Number(e))
            setActivePage(1)
            handleRefetch()
          }}
        />
      </Flex>

      <Pagination
        mt="xs"
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
