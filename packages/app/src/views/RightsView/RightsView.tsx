/* eslint-disable react/no-unstable-nested-components */
import { Button, Center, Flex, Loader, Text, Title } from '@mantine/core'
import {
  IconCircleCheckFilled,
  IconShieldCheckFilled,
} from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import { HttpNotification, Rights, UserRight } from 'lib'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useGetRights } from '@/api/rights'
import { useGetRoles, UserRolesResponse } from '@/api/roles'

export function RightsView(): JSX.Element {
  const { t } = useTranslation()

  const {
    data: rights,
    isLoading: isLoadingRights,
    isFetching: isFetchingRights,
    isInitialLoading: isInitialLoadingRights,
    isError: isErrorRights,
    error: errorRights,
    refetch: refetchRights,
  } = useGetRights()

  const { data: roles, refetch: refetchRoles } = useGetRoles()

  function userHasRight(
    rightName: string,
    inputRoles?: UserRolesResponse['content']
  ): boolean {
    const userRole = inputRoles?.find(role => role.name === 'USER') || {
      rights: [],
    }
    return userRole.rights.some(right => right.name === rightName)
  }

  function adminHasRight(
    rightName: string,
    inputRoles?: UserRolesResponse['content']
  ): boolean {
    const adminRole = inputRoles?.find(role => role.name === 'ADMIN') || {
      rights: [],
    }
    return adminRole.rights.some(right => right.name === rightName)
  }

  const columns = useMemo<ColumnDef<UserRight>[]>(
    () => [
      {
        accessorKey: 'name',
        header: () => <Text>{t('rightsView.table.name')}</Text>,
        cell: info => info.getValue(),
      },
      // For displaying the description of a right
      // {
      //   accessorKey: 'description',
      //   header: () => <Text>{t('rightsView.table.description')}</Text>,
      //   cell: info => info.getValue(),
      // },
      {
        accessorKey: 'indicatorUser',
        header: () => <Text>{t('rightsView.table.userRole')}</Text>,
        cell: info => {
          const rightName = info.row.original.name
          return userHasRight(rightName, roles?.content) ? (
            <IconCircleCheckFilled />
          ) : null
        },
      },
      {
        accessorKey: 'indicatorAdmin',
        header: () => <Text>{t('rightsView.table.adminRole')}</Text>,
        cell: info => {
          const rightName = info.row.original.name
          return adminHasRight(rightName, roles?.content) ? (
            <IconCircleCheckFilled />
          ) : null
        },
      },
    ],
    [roles, t]
  )

  return (
    <>
      <HttpNotification
        isLoading={isFetchingRights && !isInitialLoadingRights}
        isError={isErrorRights}
        errorTitle={`Error ${
          errorRights?.response?.status
            ? `(${errorRights?.response?.status})`
            : ''
        }`}
        errorMessage={errorRights?.message}
        loadingTitle={t('notifications.loadingAsyncData.title') as string}
        loadingMessage={t('notifications.loadingAsyncData.message') as string}
      />

      <Flex py="md" justify="space-between" align="center">
        <Title size="h2">
          <Flex align="center" gap={10}>
            <IconShieldCheckFilled size="32" />
            <Text> {t('rightsView.title')}</Text>
          </Flex>
        </Title>

        <Button
          variant="light"
          onClick={() => {
            refetchRights()
            refetchRoles()
          }}
        >
          {t('rightsView.action.refresh')}
        </Button>
      </Flex>

      {isLoadingRights ? (
        <Center h="100%">
          <Loader size="xl" name="loader" />
        </Center>
      ) : (
        <Rights rights={rights?.content || []} columns={columns} />
      )}
    </>
  )
}
