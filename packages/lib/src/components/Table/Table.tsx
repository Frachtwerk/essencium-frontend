import { Flex, Table as MantineTable } from '@mantine/core'
import { IconSortAscending2, IconSortDescending2 } from '@tabler/icons-react'
import { flexRender, Table as TanstackTable } from '@tanstack/react-table'

type Props<T> = {
  tableModel: TanstackTable<T>
}

export function Table<T>({ tableModel }: Props<T>): JSX.Element {
  return (
    <Flex direction="column" align="end">
      <div style={{ overflowX: 'auto', width: '100%' }}>
        <MantineTable striped highlightOnHover>
          <thead aria-label="header-row">
            {tableModel.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    <Flex
                      align="center"
                      justify="space-between"
                      sx={{ cursor: 'pointer' }}
                      onClick={header.column.getToggleSortingHandler()}
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
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody aria-label="table-body">
            {tableModel.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
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
