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

import { AppShell, MantineProvider } from '@mantine/core'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TablePagination } from './TablePagination'

describe('TablePagination.tsx', () => {
  vi.mock('@mantine/core', async () => {
    const mantineCore = (await vi.importActual('@mantine/core')) as Record<
      string,
      unknown
    >

    return {
      ...mantineCore,
      useMantineTheme: () => ({}),
    }
  })

  vi.mock('@tanstack/react-table', async () => {
    return {
      getCoreRowModel: () => [],
      useReactTable: () => {
        return {
          getPageCount: vi.fn(),
          setPageSize: vi.fn(),
          getHeaderGroups: () => [],
          getFooterGroups: () => [],
          getRowModel: () => ({
            rows: [],
          }),
          getState: () => ({
            pagination: {
              pageIndex: 0,
              pageSize: 5,
            },
          }),
        }
      },
    }
  })

  const table = useReactTable({
    data: [
      {
        authority: 'TEMPORARY_EMPLOYEE_DELETE_OE_CASCADING',
        description: '',
      },
      {
        authority: 'FACTORY_INSTRUCTOR',
        description: '',
      },
      {
        authority: 'RIGHT_UPDATE',
        description: '',
      },
      {
        authority: 'DOCUMENT_UPDATE_USER',
        description: '',
      },
      {
        authority: 'TRANSLATION_READ',
        description: '',
      },
      {
        authority: 'TEMPORARY_EMPLOYEE_READ',
        description: '',
      },
      {
        authority: 'DOCUMENT_TYPE_CREATE',
        description: '',
      },
      {
        authority: 'NOTIFICATION_CREATE',
        description: '',
      },
      {
        authority: 'INSTRUCTOR_UPDATE',
        description: '',
      },
    ],
    columns: [],
    getCoreRowModel: getCoreRowModel(),
    pageCount: 10,
  })

  const mockedProps = {
    table,
    pageSize: 5,
    activePage: 1,
    setPageSize: vi.fn(),
    setActivePage: vi.fn(),
  }

  it('should render page select and pagination', () => {
    const renderedComponent = render(
      <MantineProvider>
        <AppShell>
          <TablePagination {...mockedProps} />
        </AppShell>
      </MantineProvider>,
    )

    const pageSelectDescription = screen.getByText('table.footer.pageSize')

    expect(pageSelectDescription).toBeDefined()

    const pageSelect = screen.getByLabelText(
      'table.footer.pageSize',
    ) as HTMLSelectElement

    expect(pageSelect).toBeDefined()

    const paginationButton = screen.getByRole('button', { name: '1' })

    expect(paginationButton).toBeDefined()

    const paginationControls = document.querySelectorAll(
      '. mantine-Pagination-control',
    )

    expect(paginationControls).toBeDefined()

    fireEvent.input(pageSelect, { target: { value: '10' } })

    expect(pageSelect.value).toBe('10')

    renderedComponent.unmount()
  })

  it('it should not render page select, when fixed page size is set ', () => {
    const renderedComponent = render(
      <MantineProvider>
        <AppShell>
          <TablePagination
            table={mockedProps.table}
            pageSize={mockedProps.pageSize}
            activePage={mockedProps.activePage}
            setPageSize={mockedProps.setPageSize}
            setActivePage={mockedProps.setActivePage}
            fixedTablePageSize={2}
          />
        </AppShell>
      </MantineProvider>,
    )

    const pageSelect = screen.queryByLabelText('table.footer.pageSize')

    expect(pageSelect).toBeNull()

    const paginationButton = screen.getByRole('button', { name: '1' })

    expect(paginationButton).toBeDefined()

    renderedComponent.unmount()
  })
})
