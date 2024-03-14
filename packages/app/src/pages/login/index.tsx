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

import { LoginForm } from '@frachtwerk/essencium-lib'
import { ResetPassword } from '@frachtwerk/essencium-types'
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Text,
  Title,
} from '@mantine/core'
import { useSetAtom } from 'jotai'
import Image from 'next/image'
import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'

import {
  authTokenAtom,
  useCreateToken,
  useGetSsoApplications,
  useResetPassword,
} from '@/api'
import { PublicLayout } from '@/components/layouts'
import { getTranslation, withBaseStylingShowNotification } from '@/utils'
import { baseGetServerSideProps } from '@/utils/next'

import classes from './Login.module.css'

const OAUTH_REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/login`

function LoginView(): JSX.Element {
  const { t } = useTranslation()

  const router = useRouter()

  const searchParams = useSearchParams()

  const { data: ssoApplications } = useGetSsoApplications()

  const hasSsoApplications = ssoApplications && Object.keys(ssoApplications)

  const oauthToken = searchParams.get('token')

  const setAuthToken = useSetAtom(authTokenAtom)

  useEffect(() => {
    if (oauthToken) {
      setAuthToken(oauthToken)

      router.push(searchParams.get('redirect') || '/')
    }
  }, [oauthToken, router, searchParams, setAuthToken])

  const { mutate: resetPassword, isLoading: isResettingPassword } =
    useResetPassword()
  const [isResetPasswordSent, setIsResetPasswordSent] = useState(false)
  const [isPasswordResetFormOpened, setIsPasswordResetFormOpened] =
    useState(false)

  const { mutate: createToken } = useCreateToken()

  function handleLogin(username: string, password: string): void {
    createToken(
      { username, password },
      {
        onSuccess: () => router.push(searchParams.get('redirect') || '/'),
        onError: () => {
          withBaseStylingShowNotification({
            title: t('loginView.errorMessage.title'),
            color: 'error',
            notificationType: 'created',
          })
        },
      },
    )
  }

  function handlePasswordReset(email: ResetPassword['email']): void {
    resetPassword(email, {
      onSuccess: () => {
        setIsResetPasswordSent(true)
        setIsPasswordResetFormOpened(false)
      },
    })
  }

  return (
    <Container mt="150px">
      {!oauthToken ? (
        <Card
          shadow="sm"
          radius="sm"
          className={classes['loginCard']}
          withBorder
        >
          <Flex direction="column">
            <Title order={2} className={classes['loginCard--title']}>
              {t('loginView.title')}
            </Title>

            {hasSsoApplications ? (
              <>
                <Box className={classes['ssoSection']}>
                  {Object.keys(ssoApplications).map(application => (
                    <NextLink
                      className={classes['ssoSection--link']}
                      key={application}
                      href={`${process.env.NEXT_PUBLIC_API_BASE_URL}${ssoApplications[application].url}?redirect_uri=${OAUTH_REDIRECT_URI}`}
                    >
                      <Flex
                        justify="center"
                        align="center"
                        className={classes['ssoSection--button']}
                      >
                        <Button
                          variant="outline"
                          fullWidth
                          leftSection={
                            <Image
                              src={ssoApplications[application].imageUrl}
                              alt={ssoApplications[application].name}
                              width={45}
                              height={20}
                            />
                          }
                        >
                          <Box className={classes['ssoSection--spacer']} />

                          <Text>{ssoApplications[application].name}</Text>
                        </Button>
                      </Flex>
                    </NextLink>
                  ))}
                </Box>

                <Divider
                  className={classes['ssoSection--divider']}
                  label={t('loginView.sso.or')}
                  labelPosition="center"
                />
              </>
            ) : null}

            <LoginForm
              handleLogin={handleLogin}
              handlePasswordReset={handlePasswordReset}
              setIsPasswordResetFormOpened={setIsPasswordResetFormOpened}
              isResetPasswordSent={isResetPasswordSent}
              isPasswordResetFormOpened={isPasswordResetFormOpened}
              isResettingPassword={isResettingPassword}
            />
          </Flex>
        </Card>
      ) : null}
    </Container>
  )
}

LoginView.getLayout = function getLayout(page: React.ReactNode): JSX.Element {
  return (
    <PublicLayout routeName={getTranslation('loginView.title')}>
      {page}
    </PublicLayout>
  )
}

export const getServerSideProps = baseGetServerSideProps()

export default LoginView
