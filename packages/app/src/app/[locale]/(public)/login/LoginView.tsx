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

import { LoginForm } from '@frachtwerk/essencium-lib'
import { ResetPassword } from '@frachtwerk/essencium-types'
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Image,
  Text,
  Title,
} from '@mantine/core'
import { useMediaQuery } from '@mantine/hooks'
import { useSetAtom } from 'jotai'
import NextLink from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { type JSX } from 'react'
import { useTranslation } from 'react-i18next'

import {
  authTokenAtom,
  useCreateToken,
  useGetSsoApplications,
  useResetPassword,
} from '@/api'
import { isBrowserEnvironment } from '@/utils'

import classes from './Login.module.css'

const OAUTH_REDIRECT_URI =
  isBrowserEnvironment() &&
  !process.env.NEXT_PUBLIC_DISABLE_INSTRUMENTATION &&
  window?.runtimeConfig?.optional?.OAUTH_REDIRECT_URI !== 'undefined'
    ? `${window.runtimeConfig.optional.OAUTH_REDIRECT_URI}/login`
    : `${process.env.NEXT_PUBLIC_APP_URL}/login`

export default function LoginView(): JSX.Element {
  const { t } = useTranslation()

  const router = useRouter()

  const searchParams = useSearchParams()

  const matches = useMediaQuery('(min-width: 65em)')

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

  const { mutate: resetPassword, isPending: isResettingPassword } =
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
    <Suspense>
      <Container className={classes.loginCard__container}>
        {!oauthToken ? (
          <Flex
            direction="row"
            className={!matches ? classes.loginBackground__flex : ' '}
          >
            <Flex
              className={classes.loginCard__flex}
              w={matches ? '50%' : '100%'}
            >
              <Card className={classes['loginCard']} withBorder>
                <Flex direction="column">
                  <Title order={2} className={classes['loginCard__title']}>
                    {t('loginView.title')}
                  </Title>

                  {hasSsoApplications ? (
                    <>
                      <Box className={classes['ssoSection']}>
                        {Object.keys(ssoApplications).map(application => (
                          <Button
                            component={NextLink}
                            key={application}
                            href={`${
                              isBrowserEnvironment() &&
                              !process.env
                                .NEXT_PUBLIC_DISABLE_INSTRUMENTATION &&
                              window.runtimeConfig.required.API_URL !==
                                'undefined'
                                ? window.runtimeConfig.required.API_URL
                                : process.env.NEXT_PUBLIC_API_URL
                            }${
                              ssoApplications[application].url
                            }?redirect_uri=${OAUTH_REDIRECT_URI}`}
                            variant="outline"
                            fullWidth
                            leftSection={
                              <Image
                                src={ssoApplications[application].imageUrl}
                                alt={ssoApplications[application].name}
                                w={45}
                                h={20}
                              />
                            }
                          >
                            <Box className={classes['ssoSection__spacer']} />

                            <Text>{ssoApplications[application].name}</Text>
                          </Button>
                        ))}
                      </Box>

                      <Divider
                        className={classes['ssoSection__divider']}
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
            </Flex>

            {matches ? (
              <Flex className={classes.loginBackground__flex} w="50%">
                <Image
                  className={classes.loginBackground__image}
                  src="/img/web/logotype_weiß_400x100px.svg"
                  alt={t('header.logo')}
                />

                <Text className={classes.loginBackground__text}>
                  {t('loginView.slogan')}
                </Text>
              </Flex>
            ) : null}
          </Flex>
        ) : null}
      </Container>
    </Suspense>
  )
}
