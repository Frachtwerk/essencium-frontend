import { CellContext } from '@tanstack/react-table'
import { render, RenderResult, screen, within } from '@testing-library/react'
import { RoleOutput } from 'types'
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'

import { Roles } from './Roles'

describe('Roles', () => {
  let RolesMounted: RenderResult

  const roles: RoleOutput[] = []

  type CellContextType = CellContext<RoleOutput, unknown>

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

  const columns = [
    {
      accessorKey: 'name',
      header: () => 'rolesView.table.name',
      cell: (info: CellContextType) => info.getValue(),
    },
    {
      accessorKey: 'description',
      header: () => 'rolesView.table.description',
      cell: (info: CellContextType) => info.getValue(),
    },
    {
      accessorKey: 'rights',
      header: () => 'rolesView.table.rights',
      cell: (info: CellContextType) => info.getValue(),
    },
  ]

  beforeEach(() => {
    RolesMounted = render(<Roles roles={roles} columns={columns} />)
  })

  afterEach(() => {
    RolesMounted.unmount()
  })

  it('should render the roles table with all defined roles', () => {
    roles.forEach(role => {
      expect(screen.queryByText(role.name)).toBeDefined()
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
