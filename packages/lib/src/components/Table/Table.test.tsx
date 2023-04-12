import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { render, RenderResult, screen } from '@testing-library/react'
import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import { Table } from './Table'

const USERS = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
  },
  {
    id: 3,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
  },
  {
    id: 4,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
  },
  {
    id: 5,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
  },
  {
    id: 6,
    name: 'Mrs. Dennis Schulist',
    username: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
  },
  {
    id: 7,
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
  },
  {
    id: 8,
    name: 'Nicholas Runolfsdottir V',
    username: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
  },
  {
    id: 9,
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
  },
  {
    id: 10,
    name: 'Clementina DuBuque',
    username: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
  },
  {
    id: 11,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 12,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
  },
  {
    id: 13,
    name: 'Clementine Bauch',
    username: 'Samantha',
    email: 'Nathan@yesenia.net',
  },
  {
    id: 14,
    name: 'Patricia Lebsack',
    username: 'Karianne',
    email: 'Julianne.OConner@kory.org',
  },
  {
    id: 15,
    name: 'Chelsey Dietrich',
    username: 'Kamren',
    email: 'Lucio_Hettinger@annie.ca',
  },
  {
    id: 16,
    name: 'Mrs. Dennis Schulist',
    username: 'Leopoldo_Corkery',
    email: 'Karley_Dach@jasper.info',
  },
  {
    id: 17,
    name: 'Kurtis Weissnat',
    username: 'Elwyn.Skiles',
    email: 'Telly.Hoeger@billy.biz',
  },
  {
    id: 18,
    name: 'Nicholas Runolfsdottir V',
    username: 'Maxime_Nienow',
    email: 'Sherwood@rosamond.me',
  },
  {
    id: 19,
    name: 'Glenna Reichert',
    username: 'Delphine',
    email: 'Chaim_McDermott@dana.io',
  },
  {
    id: 20,
    name: 'Clementina DuBuque',
    username: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
  },
]

describe('Table', () => {
  let TableMounted: RenderResult

  beforeAll(() => {
    vi.mock('@tanstack/react-table', async () => {
      return {
        getCoreRowModel: () => [],
        getSortedRowModel: () => [],
        getPaginationRowModel: () => [],
        useReactTable: () => {
          return {
            getHeaderGroups: () => [],
            getFooterGroups: () => [],
            getRowModel: () => ({
              rows: [],
              getPageCount: () => USERS.length / 10,
            }),
            getState: () => ({
              pagination: {
                pageIndex: 0,
                pageSize: 10,
              },
            }),
          }
        },
      }
    })

    const table = useReactTable({
      data: USERS,
      columns: [],
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    })

    TableMounted = render(<Table tableModel={table} />)
  })

  afterAll(() => {
    TableMounted.unmount()
  })

  it('renders table headers', () => {
    const headerRow = screen.getByLabelText('header-row')
    expect(headerRow).toBeDefined()
  })

  it('renders table rows', () => {
    const tableBody = screen.getAllByLabelText('table-body')
    expect(tableBody).toBeDefined()
  })

  it('renders table footers', () => {
    const footerRow = screen.getByLabelText('footer-row')
    expect(footerRow).toBeDefined()
  })
})
