/* eslint-disable react/no-unstable-nested-components */
import { Button, Center, Flex, Loader, Text, Title } from '@mantine/core'
import {
  IconCircleCheckFilled,
  IconShieldCheckFilled,
} from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import { HttpNotification, Rights, UserRight } from 'lib'
import { useCallback, useMemo } from 'react'
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

  const hasRight = useCallback(
    (rightName: string, roleName: string) => {
      const matchedRole = roles?.content?.find(role => role.name === roleName)

      if (!matchedRole)
        throw Error(`Role ${roleName} does not exist in ${roles?.content}`)

      return matchedRole.rights.some(right => right.name === rightName)
    },
    [roles?.content]
  )

  const columns = useMemo<ColumnDef<UserRight>[]>(
    () => [
      {
        accessorKey: 'name',
        header: () => <Text>{t('rightsView.table.name')}</Text>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'indicatorUser',
        header: () => <Text>{t('rightsView.table.userRole')}</Text>,
        cell: info => {
          const rightName = info.row.original.name
          return hasRight(rightName, 'USER') ? <IconCircleCheckFilled /> : null
        },
      },
      {
        accessorKey: 'indicatorAdmin',
        header: () => <Text>{t('rightsView.table.adminRole')}</Text>,
        cell: info => {
          const rightName = info.row.original.name
          return hasRight(rightName, 'ADMIN') ? <IconCircleCheckFilled /> : null
        },
      },
    ],
    [t, hasRight]
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
