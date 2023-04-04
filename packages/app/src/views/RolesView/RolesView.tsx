/* eslint-disable react/no-unstable-nested-components */
import { Badge, Button, Center, Flex, Loader, Text, Title } from '@mantine/core'
import { IconShieldCheckFilled } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import { HttpNotification, Roles } from 'lib'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { RightOutput, RoleOutput } from 'types'

import { useGetRoles } from '@/api/roles'

export function RolesView(): JSX.Element {
  const { t } = useTranslation()

  const {
    data: roles,
    isLoading: isLoadingRoles,
    isFetching: isFetchingRoles,
    isInitialLoading: isInitialLoadingRoles,
    isError: isErrorRoles,
    error: errorRoles,
    refetch: refetchRoles,
  } = useGetRoles()

  const handleRefetch = useCallback((): void => {
    refetchRoles()
  }, [refetchRoles])

  const columns = useMemo<ColumnDef<RoleOutput>[]>(() => {
    return [
      {
        accessorKey: 'name',
        header: () => <Text>{t('rolesView.table.name')}</Text>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'description',
        header: () => <Text>{t('rolesView.table.description')}</Text>,
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'rights',
        header: () => <Text>{t('rolesView.table.rights')}</Text>,
        cell: info => (
          <>
            {(info.getValue() as RightOutput[]).map((right: RightOutput) => (
              <Badge
                key={right.id}
                variant="outline"
                color="orange"
                style={{ margin: 3 }}
              >
                {right.name}
              </Badge>
            ))}
          </>
        ),
      },
    ]
  }, [t])

  return (
    <>
      <HttpNotification
        isLoading={isFetchingRoles && !isInitialLoadingRoles}
        isError={isErrorRoles}
        errorTitle={`Error ${
          errorRoles?.response?.status
            ? `(${errorRoles?.response?.status})`
            : ''
        }`}
        errorMessage={errorRoles?.message}
        loadingTitle={t('notifications.loadingAsyncData.title') as string}
        loadingMessage={t('notifications.loadingAsyncData.message') as string}
      />

      <Flex py="md" justify="space-between" align="center">
        <Title size="h2">
          <Flex align="center" gap={10}>
            <IconShieldCheckFilled size="32" />
            <Text> {t('rolesView.title')}</Text>
          </Flex>
        </Title>

        <Button
          variant="light"
          onClick={() => {
            handleRefetch()
          }}
        >
          {t('rolesView.action.refresh')}
        </Button>
      </Flex>

      {isLoadingRoles ? (
        <Center h="100%">
          <Loader size="xl" name="loader" />
        </Center>
      ) : (
        <Roles roles={roles?.content || []} columns={columns} />
      )}
    </>
  )
}
