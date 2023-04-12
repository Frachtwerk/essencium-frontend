import { Flex, Pagination, Select, Text } from '@mantine/core'
import { Table as TanstackTable } from '@tanstack/react-table'
import { t } from 'i18next'

type Props<T> = {
  table: TanstackTable<T>
  pageSize: number
  activePage: number
  setPageSize: (pageSize: number) => void
  setActivePage: (activePage: number) => void
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
  return (
    <Flex align="center">
      <Text size="sm" mr="xl">
        {t('table.footer.pageCount')} {table.getPageCount()}
      </Text>

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