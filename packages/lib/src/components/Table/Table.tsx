import {
  Flex,
  Select,
  Table as MantineTable,
  useMantineTheme,
} from '@mantine/core'
import { IconSortAscending2, IconSortDescending2 } from '@tabler/icons-react'
import { flexRender, Table as TanstackTable } from '@tanstack/react-table'
import { useState } from 'react'

type Props<T> = {
  tableModel: TanstackTable<T>
  onFilterChange?: (key: string, value: string) => void
  showFilter?: boolean
  filterData?: Record<string, Array<string>>
}

export function Table<T>({
  tableModel,
  onFilterChange,
  showFilter,
  filterData,
}: Props<T>): JSX.Element {
  const theme = useMantineTheme()

  const [filterValue, setFilterValue] = useState<string>('')

  return (
    <Flex direction="column" align="end">
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <MantineTable striped highlightOnHover>
          <thead aria-label="header-row">
            {tableModel.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id} style={{ verticalAlign: 'top' }}>
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
                        value={filterValue}
                        onChange={event => {
                          setFilterValue(event!)
                          header.column.setFilterValue(event)
                          onFilterChange?.(header.column.id, event!)
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
              >
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} width={cell.column.getSize()}>
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
