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

'use client'

import { Table } from '@frachtwerk/essencium-lib'
import type {
  TranslationInput,
  TranslationOutput,
  TranslationTableRow,
} from '@frachtwerk/essencium-types'
import { Box, Flex, Group, Select, Text, TextInput, Title } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import {
  IconChevronDown,
  IconChevronUp,
  IconLanguage,
  IconSearch,
  IconX,
} from '@tabler/icons-react'
import {
  ColumnDef,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import type { JSX } from 'react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  useDeleteTranslation,
  useGetTranslations,
  useUpdateTranslation,
} from '@/api'
import { routing } from '@/i18n/routing'
import { mergeTranslations } from '@/utils/mergeTranslations'

import { TranslationChangeForm } from '../../translations/_components/TranslationsChangeForm'

type Props = {
  staticMessages: Record<string, Record<string, TranslationOutput>>
}

export function transformData(
  translationObject: TranslationOutput,
  path: string[] = [],
): TranslationTableRow[] | undefined {
  if (!translationObject) return

  return Object.entries(translationObject).map(([key, value]) => {
    const currentPath = [...path, key]

    const row: TranslationTableRow = {
      key,
    }

    if (typeof value === 'string' && value !== '') {
      // entry is key value pair
      row.value = value
      row.keyPath = currentPath.join('.')
    } else if (typeof value === 'object' && value !== null) {
      // entry containts subRows
      row.subRows = transformData(value, currentPath)
    }

    return row
  })
}

const searchTableRowsAndReturnPath = (
  rows: TranslationTableRow[],
  searchQuery: string,
  currentPath: string[] = [],
): TranslationTableRow[] => {
  const result: TranslationTableRow[] = []

  rows.forEach(currentRow => {
    const newPath = [...currentPath, currentRow.key]
    let matchedSubRows: TranslationTableRow[] = []

    // Recursively search subRows
    if (currentRow.subRows) {
      matchedSubRows = searchTableRowsAndReturnPath(
        currentRow.subRows,
        searchQuery.toLowerCase(),
        newPath,
      )
    }

    // Check if the current row or any subRow matches the search query
    const isMatch = currentRow.value?.toLowerCase().includes(searchQuery)

    if (isMatch || matchedSubRows.length > 0) {
      // Include the current row, and only add non-empty matchedSubRows
      result.push({
        key: currentRow.key,
        value: isMatch ? currentRow.value : undefined,
        subRows: matchedSubRows.length > 0 ? matchedSubRows : undefined,
        keyPath: matchedSubRows.length === 0 ? newPath.join('.') : undefined,
      })
    }
  })

  return result
}

export default function TranslationsView({
  staticMessages,
}: Props): JSX.Element {
  const currentLocale = useLocale()
  const router = useRouter()

  const t = useTranslations()

  const [locale, setLocale] = useState(currentLocale)

  const [searchQuery, setSearchQuery] = useState<string | null>(null)

  const [debouncedSearchQuery] = useDebouncedValue<string | null>(
    searchQuery,
    300,
  )

  const [updatedTranslations, setUpdatedTranslations] =
    useState<TranslationOutput | null>(null)

  const [transformedTranslations, setTransformedTranslations] = useState<
    TranslationTableRow[] | null
  >(null)

  const [searchedTransformedTranslations, setSearchedTransformedTranslations] =
    useState<TranslationTableRow[] | null>(null)

  const { data: serverTranslationsDe, refetch: refetchServerTranslationsDe } =
    useGetTranslations('de')()

  const { data: serverTranslationsEn, refetch: refetchServerTranslationsEn } =
    useGetTranslations('en')()

  const { mutate: updateTranslation } = useUpdateTranslation()

  const { mutate: deleteTranslation } = useDeleteTranslation()

  const onUpdateTranslation = useCallback(
    (translationInput: TranslationInput): void => {
      updateTranslation(translationInput, {
        onSuccess: async () => {
          await refetchServerTranslationsDe()
          await refetchServerTranslationsEn()
          // Refresh server components to reload merged translations
          router.refresh()
        },
      })
    },
    [
      updateTranslation,
      refetchServerTranslationsDe,
      refetchServerTranslationsEn,
      router,
    ],
  )

  const onDeleteTranslation = useCallback(
    (keyPath: TranslationInput['key']): void => {
      deleteTranslation(keyPath, {
        onSuccess: async () => {
          await refetchServerTranslationsDe()
          await refetchServerTranslationsEn()
          // Refresh server components to reload merged translations
          router.refresh()
        },
      })
    },
    [
      deleteTranslation,
      refetchServerTranslationsDe,
      refetchServerTranslationsEn,
      router,
    ],
  )

  const mergedTranslations = useMemo(() => {
    return mergeTranslations(
      staticMessages[locale] as TranslationOutput,
      locale === 'de' ? serverTranslationsDe : serverTranslationsEn,
    )
  }, [staticMessages, serverTranslationsDe, serverTranslationsEn, locale])

  useEffect(() => {
    setUpdatedTranslations(mergedTranslations)

    setTransformedTranslations(transformData(updatedTranslations ?? {}) || [])
  }, [setTransformedTranslations, updatedTranslations, mergedTranslations])

  useEffect(() => {
    const searchResults = searchTableRowsAndReturnPath(
      transformedTranslations || [],
      debouncedSearchQuery || '',
    )
    setSearchedTransformedTranslations(searchResults)
  }, [
    setSearchedTransformedTranslations,
    transformedTranslations,
    debouncedSearchQuery,
  ])

  // Pre-compute translated headers outside useMemo to avoid
  // unstable `t` reference causing constant column recalculation
  // which remounts TranslationChangeForm and resets form state
  const headerKey = t('translationsView.table.key')
  const headerValue = t('translationsView.table.value')

  const columns = useMemo<ColumnDef<TranslationTableRow>[]>(
    () => [
      {
        accessorKey: 'key',
        header: headerKey,
        cell: ({ row }) => {
          const rowContent = row.original

          const isParent = row.subRows && row.subRows.length > 0

          return (
            <Box>
              {isParent ? (
                <Group ml={`${row.depth * 30}px`}>
                  {row.getIsExpanded() ? (
                    <IconChevronUp />
                  ) : (
                    <IconChevronDown />
                  )}

                  <Text fw={row.getIsExpanded() ? 'bold' : undefined}>
                    {rowContent.key}
                  </Text>
                </Group>
              ) : (
                <Text ml={`${row.depth * 70}px`}>{rowContent.key}</Text>
              )}
            </Box>
          )
        },
        size: 80,
        enableSorting: false,
      },
      {
        accessorKey: 'value',
        header: headerValue,
        cell: ({ row }) => {
          const rowContent = row.original

          return rowContent.value ? (
            <TranslationChangeForm
              currentValue={rowContent.value}
              updateTranslation={onUpdateTranslation}
              locale={locale}
              keyPath={rowContent.keyPath || ''}
              deleteTranslation={onDeleteTranslation}
            />
          ) : null
        },
        size: 400,
        enableSorting: false,
      },
    ],
    [onUpdateTranslation, locale, onDeleteTranslation, headerKey, headerValue],
  )

  const table = useReactTable({
    data: debouncedSearchQuery
      ? searchedTransformedTranslations || []
      : transformedTranslations || [],
    columns,
    state: {},
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSubRows: row => row.subRows,
  })

  return (
    <>
      <Title className="py-md text-h2">
        <Flex className="gap-xs items-center">
          <IconLanguage className="size-8" />
          <Text inherit>{t('translationsView.title')}</Text>
        </Flex>
      </Title>

      <Group className="gap-md mt-lg">
        <Select
          data={[...routing.locales]}
          onChange={value => setLocale(value || currentLocale)}
          defaultValue={currentLocale}
          label={t('translationsView.select')}
          className="mb-md w-1/5"
        />

        <TextInput
          onChange={event => setSearchQuery(event.target.value)}
          label={t('translationsView.search.label')}
          placeholder={t('translationsView.search.placeholder')}
          value={searchQuery || ''}
          rightSection={
            searchQuery?.length && searchQuery.length > 0 ? (
              <IconX onClick={() => setSearchQuery(null)} className="size-4" />
            ) : null
          }
          leftSection={<IconSearch className="size-4" />}
          className="mb-md w-2/5"
        />
      </Group>

      {debouncedSearchQuery && !searchedTransformedTranslations?.length ? (
        t('translationsView.search.noResults')
      ) : (
        <Table tableModel={table} />
      )}
    </>
  )
}
