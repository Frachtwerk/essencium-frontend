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
import { showNotification } from '@mantine/notifications'
import { IconShieldCheckFilled } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import { HttpNotification, Rights } from 'lib'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { RightOutput, RoleOutput } from 'types'

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

  const handleRefetch = useCallback((): void => {
    refetchRights()
    refetchRoles()
  }, [refetchRights, refetchRoles])

  const { mutate: updateRole } = useUpdateRole({
    onSuccess: () => {
      showNotification({
        autoClose: 2500,
        title: t('notifications.updatedDataSuccess.title'),
        message: t('notifications.updatedDataSuccess.message'),
        color: 'green',
        style: { position: 'fixed', top: '20px', right: '10px' },
      })

      handleRefetch()
    },
  })

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
    role: RoleOutput,
    userRight: RightOutput
  ): RightOutput['id'][] {
    const right = role.rights.find(r => r.name === userRight.name)

    if (right) {
      return role.rights.filter(r => r.name !== userRight.name).map(r => r.id)
    }
    return [...role.rights, { name: userRight.name, id: userRight.id }].map(
      r => r.id
    )
  }

  const columns = useMemo<ColumnDef<RightOutput>[]>(() => {
    const roleColumns: ColumnDef<RightOutput>[] = (roles?.content || []).map(
      role => ({
        accessorKey: `${role.name}`,
        header: () => <Text>{t(`rightsView.table.${role.name}`)}</Text>,
        cell: info => {
          const right = info.row.original

          const updatedRole = {
            ...role,
            rights: toggleRight(role, right),
          }

          if (role.name === 'ADMIN') {
            return (
              <Checkbox disabled checked={hasRight(right.name, role.name)} />
            )
          }

          return (
            <Checkbox
              onChange={() => updateRole(updatedRole)}
              checked={hasRight(right.name, role.name)}
            />
          )
        },
      })
    )

    return [
      {
        accessorKey: 'name',
        header: () => <Text>{t('rightsView.table.name')}</Text>,
        cell: info => info.getValue(),
      },
      ...roleColumns,
    ]
  }, [t, hasRight, updateRole, roles?.content])

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
