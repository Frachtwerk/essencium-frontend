/* eslint-disable no-console */
import { useMemo } from 'react'
import { List, Title } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { Props, User, userSchema } from './types'

function TestComponent({ users, shouldLoadApiUsers = false }: Props) {
  const { t } = useTranslation()

  const apiUsers = useQuery<User[]>(
    ['todos'],
    () =>
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(data => data),
    { enabled: shouldLoadApiUsers }
  )

  useMemo(() => {
    if (!shouldLoadApiUsers) return

    console.log('React Query RESPONSE:', apiUsers)

    const isValidUserArray = apiUsers.data?.every(user =>
      userSchema.isValidSync(user)
    )

    console.log('VALIDATION SUCCEEDED:', String(isValidUserArray))
  }, [apiUsers, shouldLoadApiUsers])

  return (
    <>
      <Title order={2}>
        {users.length} {t('usersGivenByProp')}
      </Title>
      <List>
        {users.map(user => (
          <List.Item key={user.id}>
            {user.username} ({user.id})
          </List.Item>
        ))}
      </List>
      <Title order={2}>
        {shouldLoadApiUsers
          ? `${apiUsers.data?.length ?? 'no'} ${t('apiUsersLoaded')}`
          : t('noApiUsersLoaded')}
      </Title>

      <Title>Monorepo Test</Title>
    </>
  )
}

export default TestComponent
