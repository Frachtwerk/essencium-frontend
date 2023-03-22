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
import { useGetRoles, UserRoleResponse } from '@/api/roles'

export function RightsView(): JSX.Element {
  const { t } = useTranslation()

  const rights = useGetRights()
  const roles = useGetRoles()

  function userHasRight(
    rightName: string,
    inputRoles?: UserRoleResponse['content']
  ): boolean {
    const userRole = inputRoles?.find(role => role.name === 'USER') || {
      rights: [],
    }
    return userRole.rights.some(right => right.name === rightName)
  }

  function adminHasRight(
    rightName: string,
    inputRoles?: UserRoleResponse['content']
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
          return userHasRight(rightName, roles?.data?.content) ? (
            <IconCircleCheckFilled />
          ) : null
        },
      },
      {
        accessorKey: 'indicatorAdmin',
        header: () => <Text>{t('rightsView.table.adminRole')}</Text>,
        cell: info => {
          const rightName = info.row.original.name
          return adminHasRight(rightName, roles?.data?.content) ? (
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
        isLoading={rights.isFetching && !rights.isInitialLoading}
        isError={rights.isError}
        errorTitle={`Error ${
          rights.error?.response?.status
            ? `(${rights.error?.response?.status})`
            : ''
        }`}
        errorMessage={rights.error?.message}
        loadingTitle={t('notifications.loadingAsyncData.title') as string}
        loadingMessage={t('notifications.loadingAsyncData.message') as string}
      />

      <Flex py="md" justify="space-between" align="center">
        <Title variant="u">
          <Flex align="center" gap={10}>
            <IconShieldCheckFilled size="42" />
            <Text> {t('rightsView.title')}</Text>
          </Flex>
        </Title>

        <Button
          variant="light"
          onClick={() => {
            rights.refetch()
            roles.refetch()
          }}
        >
          {t('rightsView.action.refresh')}
        </Button>
      </Flex>

      {rights.isLoading ? (
        <Center h="100%">
          <Loader size="xl" name="loader" />
        </Center>
      ) : (
        <Rights rights={rights?.data?.content || []} columns={columns} />
      )}
    </>
  )
}
