import { CellContext } from '@tanstack/react-table'
import { render, RenderResult, screen, within } from '@testing-library/react'
import { RightOutput, RIGHTS } from 'types'
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import { Rights } from './Rights'

describe('Rights', () => {
  let RightsMounted: RenderResult

  const rights: RightOutput[] = []

  type CellContextType = CellContext<RightOutput, unknown>

  beforeAll(() => {
    vi.mock('react-i18next', () => ({
      useTranslation: () => {
        return {
          t: (str: unknown) => str,
        }
      },
    }))

    vi.mock('translations', () => ({
      i18n: {
        t: (str: unknown) => str,
      },
    }))
  })

  Object.entries(RIGHTS).forEach(([key, value], index) => {
    rights.push({
      id: index,
      name: key,
      description: value,
    })
  })

  const columns = [
    {
      accessorKey: 'name',
      header: () => 'rightsView.table.name',
      cell: (info: CellContextType) => info.getValue(),
    },
    {
      accessorKey: 'userIndicator',
      header: () => 'rightsView.table.userRole',
      cell: (info: CellContextType) => info.getValue(),
    },
    {
      accessorKey: 'adminIndicator',
      header: () => 'rightsView.table.adminRole',
      cell: (info: CellContextType) => info.getValue(),
    },
  ]

  beforeEach(() => {
    RightsMounted = render(<Rights rights={rights} columns={columns} />)
  })

  afterEach(() => {
    RightsMounted.unmount()
  })

  it('should render the rights table with all defined rights', () => {
    rights.forEach(right => {
      expect(screen.queryByText(right.name)).toBeDefined()
    })
  })

  it('should render the table headers', () => {
    columns.forEach(column => {
      expect(screen.getByText(column.header())).toBeDefined()
    })
  })

  it('should render the correct number of rows', () => {
    const rows = screen.getAllByRole('row')
    // subtract 2 from the row count to account for the header & footer row
    expect(rows.length - 2).toEqual(10)
  })

  it('should render the correct number of columns', () => {
    const headerRow = screen.getByTestId('header-row')
    const headerCells = within(headerRow).getAllByRole('columnheader')
    expect(headerCells.length).toEqual(columns.length)
  })
})
