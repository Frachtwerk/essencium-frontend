import {
  Flex,
  Table as MantineTable,
  TextInput,
  useMantineTheme,
} from '@mantine/core'
import { IconSortAscending2, IconSortDescending2 } from '@tabler/icons-react'
import { flexRender, Table as TanstackTable } from '@tanstack/react-table'

type Props<T> = {
  tableModel: TanstackTable<T>
  onFilterChange?: (key: string, value: string) => void
  showFilter?: boolean
}

export function Table<T>({
  tableModel,
  onFilterChange,
  showFilter,
}: Props<T>): JSX.Element {
  const theme = useMantineTheme()

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
                        cursor: 'pointer',
                        '&:hover': {
                          color: theme.colors.blue[6],
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
                      <TextInput
                        w="100%"
                        size="xs"
                        value={(header.column.getFilterValue() ?? '') as string}
                        onChange={e => {
                          header.column.setFilterValue(e.target.value)
                          onFilterChange?.(header.column.id, e.target.value)
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
