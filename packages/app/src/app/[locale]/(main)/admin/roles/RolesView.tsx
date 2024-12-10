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

/* eslint-disable react/no-unstable-nested-components */

import {
  AddRole,
  DeleteDialog,
  EditRole,
  hasRequiredRights,
  HttpNotification,
  LoadingSpinner,
  Table,
  TablePagination,
} from '@frachtwerk/essencium-lib'
import {
  RightOutput,
  RIGHTS,
  RoleInput,
  RoleOutput,
} from '@frachtwerk/essencium-types'
import {
  ActionIcon,
  Badge,
  Button,
  Flex,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPencil, IconTrash, IconUserStar } from '@tabler/icons-react'
import {
  ColumnDef,
  getCoreRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useAtomValue } from 'jotai'
import { useCallback, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  useCreateRole,
  useDeleteRole,
  useGetRights,
  useGetRoles,
  userRightsAtom,
  useUpdateRole,
} from '@/api'
import { parseSorting } from '@/utils'

const DEFAULT_SORTING: SortingState = [{ id: 'name', desc: false }]

export const FORM_DEFAULTS_ROLES_VIEW = {
  name: '',
  description: '',
  rights: [],
  protected: false,
  editable: true,
}

export default function RolesView(): JSX.Element {
  const { t } = useTranslation()

  const theme = useMantineTheme()

  const userRights = useAtomValue(userRightsAtom)

  const [addModalOpened, addModalHandlers] = useDisclosure(false)
  const [editModalOpened, editModalHandlers] = useDisclosure(false)
  const [deleteModalOpened, deleteModalHandlers] = useDisclosure(false)

  const [selectedRights, setSelectedRights] = useState<RightOutput[]>([])

  const [roleToEditOrDelete, setRoleToEditOrDelete] =
    useState<RoleOutput | null>(null)

  const [activePage, setActivePage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [sorting, setSorting] = useState<SortingState>(DEFAULT_SORTING)

  const {
    data: roles,
    isLoading: isLoadingRoles,
    isFetching: isFetchingRoles,
    isError: isErrorRoles,
    error: errorRoles,
    refetch: refetchRoles,
  } = useGetRoles({
    requestConfig: {
      page: activePage - 1,
      size: pageSize,
      sort: parseSorting(sorting, DEFAULT_SORTING),
    },
  })

  const { data: rights } = useGetRights({ page: 0, size: 9999 })

  const { mutate: createRole, isPending: isCreatingRole } = useCreateRole()

  const { mutate: updateRole, isPending: isUpdatingRole } = useUpdateRole()

  const { mutate: deleteRole } = useDeleteRole()

  const handleRefetch = useCallback((): void => {
    refetchRoles()
  }, [refetchRoles])

  function handleDeleteRole(roleName: RoleOutput['name']): void {
    deleteRole(roleName, {
      onSuccess: () => {
        deleteModalHandlers.close()
        handleRefetch()
      },
      onError: () => {
        deleteModalHandlers.close()
      },
    })
  }

  function handleCreateRole(roleData: RoleInput): void {
    createRole(
      {
        ...roleData,
        rights: selectedRights.map(right => right.authority),
      },
      {
        onSuccess: () => {
          addModalHandlers.close()
          handleRefetch()
        },
        onError: () => {
          addModalHandlers.close()
        },
      },
    )
  }

  function handleUpdateRole(roleData: RoleInput): void {
    updateRole(
      {
        ...roleData,
        rights: selectedRights.map(right => right.authority),
      },
      {
        onSuccess: () => {
          editModalHandlers.close()
          handleRefetch()
        },
        onError: () => {
          editModalHandlers.close()
        },
      },
    )
  }

  function toggleRight(right: RightOutput): void {
    if (selectedRights.some(r => r.authority === right.authority)) {
      setSelectedRights(
        selectedRights.filter(r => r.authority !== right.authority),
      )
    } else {
      setSelectedRights([...selectedRights, right])
    }
  }

  const columns = useMemo<ColumnDef<RoleOutput>[]>(() => {
    return [
      {
        accessorKey: 'name',
        header: () => <Text inherit>{t('rolesView.table.name')}</Text>,
        cell: info => info.getValue(),
        size: 120,
      },
      {
        accessorKey: 'description',
        header: () => <Text inherit>{t('rolesView.table.description')}</Text>,
        cell: info => info.getValue(),
        size: 200,
      },
      {
        accessorKey: 'rights',
        header: () => <Text inherit>{t('rolesView.table.rights')}</Text>,
        size: 600,
        cell: info => (
          <>
            {(info.getValue() as RightOutput[]).map((right: RightOutput) => (
              <Badge
                variant="light"
                key={right.authority}
                bg={theme.colors.gray[2]}
                c={theme.colors.gray[8]}
                fw="normal"
                m={3}
              >
                {right.authority}
              </Badge>
            ))}
          </>
        ),
      },

      {
        accessorKey: 'actions',
        header: () => <Text inherit>{t('usersView.table.actions')}</Text>,
        enableSorting: false,
        enableColumnFilter: false,
        cell: info => {
          const rowRole = info.row.original

          return (
            <Flex direction="row" gap="xs">
              {hasRequiredRights(userRights, RIGHTS.RIGHT_UPDATE) &&
              rowRole.editable === true ? (
                <ActionIcon size="sm" variant="transparent">
                  <IconPencil
                    onClick={() => {
                      setRoleToEditOrDelete(rowRole)
                      editModalHandlers.open()
                    }}
                    color={theme.colors.blue[6]}
                  />
                </ActionIcon>
              ) : null}

              {hasRequiredRights(userRights, RIGHTS.ROLE_DELETE) &&
              rowRole.protected === false ? (
                <ActionIcon size="sm" variant="transparent">
                  <IconTrash
                    onClick={() => {
                      setRoleToEditOrDelete(rowRole)
                      deleteModalHandlers.open()
                    }}
                    color={theme.colors.blue[6]}
                  />
                </ActionIcon>
              ) : null}
            </Flex>
          )
        },
        size: 120,
      },
    ]
  }, [t, userRights, editModalHandlers, deleteModalHandlers, theme])

  const table = useReactTable({
    data: roles?.content || [],
    columns,
    state: {
      sorting,
    },
    manualSorting: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    pageCount: roles?.totalPages,
  })

  return (
    <>
      <HttpNotification
        isLoading={isFetchingRoles && !isLoadingRoles}
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
            <IconUserStar size="32" />

            <Text inherit>{t('rolesView.title')}</Text>
          </Flex>
        </Title>

        <Flex align="center" gap="xs">
          {hasRequiredRights(userRights, RIGHTS.ROLE_CREATE) ? (
            <Button onClick={() => addModalHandlers.open()}>
              {t('rolesView.action.add')}
            </Button>
          ) : null}

          <Button
            variant="light"
            onClick={() => {
              handleRefetch()
            }}
          >
            {t('actions.refresh')}
          </Button>
        </Flex>
      </Flex>

      <AddRole
        opened={addModalOpened}
        closeOnClickOutside={false}
        closeOnEscape
        title={t('rolesView.modal.titleAdd')}
        onClose={() => {
          addModalHandlers.close()
        }}
        rights={rights?.content || []}
        createRole={handleCreateRole}
        toggleRight={toggleRight}
        formDefaults={FORM_DEFAULTS_ROLES_VIEW}
        isLoading={isCreatingRole}
      />

      <EditRole
        opened={editModalOpened}
        closeOnClickOutside={false}
        closeOnEscape
        title={t('rolesView.modal.titleEdit')}
        onClose={() => {
          editModalHandlers.close()
          setRoleToEditOrDelete(null)
        }}
        rights={rights?.content || []}
        updateRole={handleUpdateRole}
        formDefaults={FORM_DEFAULTS_ROLES_VIEW}
        toggleRight={toggleRight}
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        role={roleToEditOrDelete!}
        setSelectedRights={setSelectedRights}
        isLoading={isUpdatingRole}
      />

      <DeleteDialog
        opened={deleteModalOpened}
        onClose={() => {
          deleteModalHandlers.close()
        }}
        deleteFunction={() => {
          if (roleToEditOrDelete) {
            handleDeleteRole(roleToEditOrDelete?.name)
          }
        }}
        title={t('rolesView.deleteDialog.title')}
        text={t('rolesView.deleteDialog.text')}
      />

      {isLoadingRoles ? (
        <LoadingSpinner show />
      ) : (
        <>
          <Table tableModel={table} />

          <TablePagination
            table={table}
            activePage={activePage}
            pageSize={pageSize}
            setActivePage={setActivePage}
            setPageSize={setPageSize}
            handleRefetch={handleRefetch}
          />
        </>
      )}
    </>
  )
}
