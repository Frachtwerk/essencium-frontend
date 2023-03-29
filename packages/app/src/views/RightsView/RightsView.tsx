/* eslint-disable react/no-unstable-nested-components */
import {
  Button,
  Center,
  Checkbox,
  Flex,
  Loader,
  Text,
  Title,
} from '@mantine/core'
import { IconShieldCheckFilled } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import { HttpNotification, Rights } from 'lib'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { RightOutput, RoleInput, RoleOutput } from 'types'

import { useGetRights } from '@/api/rights'
import { useGetRoles, useUpdateRole } from '@/api/roles'

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

  const { mutate: updateRole } = useUpdateRole()

  const hasRight = useCallback(
    (rightName: string, roleName: string) => {
      if (!roles?.content) {
        return false
      }

      const matchedRole = roles.content.find(role => role.name === roleName)

      if (!matchedRole)
        throw Error(`Role ${roleName} does not exist in ${roles.content}`)

      return matchedRole.rights.some(right => right.name === rightName)
    },
    [roles?.content]
  )

  function toggleRight(
    userRole: RoleOutput,
    userRightName: RightOutput['name'],
    userRightID: number
  ): number[] {
    const right = userRole.rights.find(right => right.name === userRightName)

    if (right) {
      return userRole.rights
        .filter(right => right.name !== userRightName)
        .map(right => right.id)
    } else {
      return [...userRole.rights, { name: userRightName, id: userRightID }].map(
        right => right.id
      )
    }
  }

  const columns = useMemo<ColumnDef<RightOutput>[]>(
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
          const rightID = info.row.original.id
          const role = roles?.content.find(role => role.name === 'USER')

          const updatedRole = role
            ? {
                ...role,
                rights: toggleRight(role, rightName, rightID),
              }
            : null

          return (
            <Checkbox
              onChange={() => updateRole(updatedRole as RoleInput)}
              checked={hasRight(rightName, 'USER')}
            />
          )
        },
      },
      {
        accessorKey: 'indicatorAdmin',
        header: () => <Text>{t('rightsView.table.adminRole')}</Text>,
        cell: info => {
          const rightName = info.row.original.name
          const rightID = info.row.original.id
          const role = roles?.content.find(role => role.name === 'ADMIN')

          const updatedRole = role
            ? {
                ...role,
                rights: toggleRight(role, rightName, rightID),
              }
            : null

          return (
            <Checkbox
              onChange={() => updateRole(updatedRole as RoleInput)}
              checked={hasRight(rightName, 'ADMIN')}
            />
          )
        },
      },
    ],
    [t, hasRight]
  )

  function handleRefetch(): void {
    refetchRights()
    refetchRoles()
  }

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
            handleRefetch()
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
