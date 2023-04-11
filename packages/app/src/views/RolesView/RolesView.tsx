/* eslint-disable react/no-unstable-nested-components */
import { Badge, Button, Center, Flex, Loader, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconUserCheck } from '@tabler/icons-react'
import { ColumnDef } from '@tanstack/react-table'
import { AddRole, HttpNotification, Roles } from 'lib'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { RightOutput, RoleOutput } from 'types'

import { useGetRights } from '@/api/rights'
import { useCreateRole, useGetRoles } from '@/api/roles'

export function RolesView(): JSX.Element {
  const { t } = useTranslation()

  const [modalOpened, modalHandlers] = useDisclosure(false)

  const {
    data: roles,
    isLoading: isLoadingRoles,
    isFetching: isFetchingRoles,
    isInitialLoading: isInitialLoadingRoles,
    isError: isErrorRoles,
    error: errorRoles,
    refetch: refetchRoles,
  } = useGetRoles()

  const { data: rights } = useGetRights()

  const { mutate: createRole } = useCreateRole()

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
            <IconUserCheck size="32" />
            <Text> {t('rolesView.title')}</Text>
          </Flex>
        </Title>

        <Flex align="center" gap="xs">
          <Button
            variant="light"
            onClick={() => {
              handleRefetch()
            }}
          >
            {t('actions.refresh')}
          </Button>

          <Button onClick={() => modalHandlers.open()}>
            {t('rolesView.action.add')}
          </Button>
        </Flex>
      </Flex>

      <AddRole
        opened={modalOpened}
        onClose={() => modalHandlers.close()}
        closeOnClickOutside={false}
        closeOnEscape
        size="xl"
        rights={rights?.content || []}
        handleCreateRole={createRole}
      />

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
