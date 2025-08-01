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

import { cn, LoginForm } from '@frachtwerk/essencium-lib'
import { ResetPassword } from '@frachtwerk/essencium-types'
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Flex,
  Image,
  Space,
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
      <Container className="size-full p-0" fluid>
        {!oauthToken ? (
          <Flex
            className={cn(
              'flex-row',
              !matches &&
                'gap-md to-dark-700 h-screen flex-col items-center justify-center bg-radial from-blue-700 transition-[background] duration-500',
            )}
          >
            <Flex
              className="h-screen items-center justify-center"
              w={matches ? '50%' : '100%'}
            >
              <Card className="rounded-sm shadow-sm" withBorder>
                <Flex className="flex-col">
                  <Title order={2} className="text-center">
                    {t('loginView.title')}
                  </Title>

                  {hasSsoApplications ? (
                    <>
                      <Box className="mt-md">
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
                                className="h-5 w-auto"
                              />
                            }
                          >
                            <Space w="xs" />

                            <Text>{ssoApplications[application].name}</Text>
                          </Button>
                        ))}
                      </Box>

                      <Divider
                        className="my-xl"
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
              <Flex className="gap-md to-dark-700 h-screen w-1/2 flex-col items-center justify-center bg-radial from-blue-700 transition-[background] duration-500">
                <Image
                  className="animate-fade-in mx-auto aspect-4/1 h-auto w-[300px] origin-bottom -translate-y-[10px] self-end opacity-0 drop-shadow-xl drop-shadow-blue-900"
                  src="/img/web/logotype_weiß_400x100px.svg"
                  alt={t('header.logo')}
                />

                <Text className="animate-fade-in-delay w-4/5 -translate-y-[10px] text-center text-lg font-medium text-white opacity-0">
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
