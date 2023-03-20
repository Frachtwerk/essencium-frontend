/* eslint-disable react/no-unstable-nested-components */
import { Center, Loader, Text } from '@mantine/core'
import { ColumnDef } from '@tanstack/react-table'
import { HttpNotification, Rights, UserRight } from 'lib'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetRights } from '@/api/rights'

export function RightsView(): JSX.Element {
  const { t } = useTranslation()

  const {
    data: rights,
    isError,
    isLoading,
    isFetching,
    error,
    isInitialLoading,
  } = useGetRights()

  const columns = useMemo<ColumnDef<UserRight>[]>(
    () => [
      {
        accessorKey: 'id',
        header: () => <Text>ID</Text>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'name',
        header: () => <Text>Name</Text>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'description',
        header: () => <Text>Description</Text>,
        cell: info => info.getValue(),
      },
      // {
      //   accessorKey: 'indicator',
      //   header: () => <Text>Indicator</Text>,
      //   cell: info => info.getValue(),
      // },
    ],
    []
  )

  return (
    <>
      <HttpNotification
        isLoading={isFetching && !isInitialLoading}
        isError={isError}
        errorTitle={`Error ${
          error?.response?.status ? `(${error?.response?.status})` : ''
        }`}
        errorMessage={error?.message}
        loadingTitle={t('notifications.loadingAsyncData.title') as string}
        loadingMessage={t('notifications.loadingAsyncData.message') as string}
      />

      {isLoading ? (
        <Center h="100%">
          <Loader size="xl" name="loader" />
        </Center>
      ) : (
        <Rights rights={rights || []} columns={columns} />
      )}
    </>
  )
}
