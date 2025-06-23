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

import {
  feedbackFormSchema,
  FeedbackInput,
  OpenInput,
  OpenInputTypeValues,
  UserOutput,
} from '@frachtwerk/essencium-types'
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Dialog,
  Flex,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
  Transition,
  UnstyledButton,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconBulb,
  IconCameraCheck,
  IconCameraPlus,
  IconCircleCheck,
  IconCircleX,
  IconExclamationCircle,
  IconMessageDots,
} from '@tabler/icons-react'
import html2canvas from 'html2canvas-pro'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'next-i18next'
import { type JSX, ReactNode, useEffect, useState } from 'react'

import { useZodForm } from '../../hooks'
import { cn } from '../../utils'
import { ControlledTextarea } from '../Form'
import { LoadingSpinner } from '../LoadingSpinner'

type NotificationParams = {
  notificationType: 'created' | 'updated' | 'deleted'
  color: 'success' | 'error'
  message: ReactNode
}

type AdditionalInformation = {
  [x: string]: string | string[]
}

type Props = {
  createFeedback: (feedback: FeedbackInput) => void
  currentUser: UserOutput | null
  feedbackCreated: boolean
  feedbackFailed: boolean
  feedbackSending: boolean
  createNotification: (params: NotificationParams) => void
  additionalInformation?: AdditionalInformation
}

export function FeedbackWidget({
  createFeedback,
  currentUser,
  feedbackCreated,
  feedbackFailed,
  feedbackSending,
  createNotification,
  additionalInformation,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const [opened, { toggle, close }] = useDisclosure(false)

  const [openInput, setOpenInput] = useState<OpenInputTypeValues | null>(null)

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [screenshot, setScreenshot] = useState<string | null>(null)

  const [isCapturingScreenshot, setIsCapturingScreenshot] =
    useState<boolean>(false)

  const pathname = usePathname()

  const { handleSubmit, control, reset, setValue } = useZodForm({
    schema: feedbackFormSchema,
    defaultValues: {
      message: '',
      firstName: '',
      lastName: '',
      email: '',
      feedbackType: OpenInput.Other,
      screenshot: '',
      path: '',
    },
  })

  useEffect(() => {
    setValue('firstName', currentUser?.firstName || '')
    setValue('lastName', currentUser?.lastName || '')
    setValue('email', currentUser?.email || '')
    setValue('feedbackType', openInput || OpenInput.Other)
    setValue('screenshot', screenshot || '')
    setValue('path', pathname || '')
  }, [currentUser, openInput, screenshot, setValue, pathname])

  const iconStyling = {
    size: openInput ? 16 : 40,
    stroke: '1.5',
  }

  const icons = {
    Issue: (
      <IconExclamationCircle
        size={iconStyling.size}
        stroke={iconStyling.stroke}
      />
    ),
    Idea: <IconBulb size={iconStyling.size} stroke={iconStyling.stroke} />,
    Other: (
      <IconMessageDots size={iconStyling.size} stroke={iconStyling.stroke} />
    ),
  }

  useEffect(() => {
    if (feedbackSending) {
      setIsLoading(true)
    }

    if (feedbackCreated) {
      setShowSuccessMessage(true)

      setIsLoading(false)
    }

    if (feedbackFailed) {
      setShowErrorMessage(true)

      setIsLoading(false)
    }
  }, [feedbackCreated, feedbackFailed, feedbackSending])

  function onCloseWidget(): void {
    close()

    reset()

    setOpenInput(null)

    setShowSuccessMessage(false)

    setShowErrorMessage(false)

    setIsLoading(false)

    setScreenshot(null)

    setIsCapturingScreenshot(false)
  }

  function onSubmit(form: FeedbackInput): void {
    if (!currentUser) return

    const formattedAdditionalInformation: AdditionalInformation = {}

    if (additionalInformation) {
      Object.keys(additionalInformation).forEach(key => {
        const value = additionalInformation[key]
        if (typeof value === 'string') {
          formattedAdditionalInformation[key] = value
        } else if (Array.isArray(value)) {
          formattedAdditionalInformation[key] = value.join(', ')
        }
      })
    }

    createFeedback({
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      feedbackType: openInput || OpenInput.Other,
      message: form.message,
      screenshot: screenshot || '',
      path: pathname || '',
      ...formattedAdditionalInformation,
    })
  }

  function captureScreenshot(): void {
    html2canvas(document.body).then(canvas => {
      const screenshotData = canvas.toDataURL('image/png')

      setScreenshot(screenshotData)

      setIsCapturingScreenshot(false)
    })
  }

  useEffect(() => {
    if (isCapturingScreenshot) {
      captureScreenshot()
    }
  }, [isCapturingScreenshot])

  useEffect(() => {
    if (screenshot) {
      createNotification({
        notificationType: 'created',
        color: 'success',
        message: t('feedbackWidget.screenshot.created'),
      })
    }
  }, [screenshot, createNotification, t])

  return (
    <>
      <ActionIcon
        variant="filled"
        aria-label={t('feedbackWidget.openButton.ariaLabel')}
        size="lg"
        className="z-20 rounded-xl"
        onClick={toggle}
      >
        <IconMessageDots size={24} />
      </ActionIcon>

      <Dialog
        opened={opened}
        withCloseButton
        onClose={() => {
          onCloseWidget()
        }}
        className={cn(
          openInput ? 'h-auto' : 'h-45',
          isCapturingScreenshot ? 'hidden' : 'w-[390px] rounded-md',
        )}
      >
        {!showSuccessMessage || !showErrorMessage ? (
          <Title className="text-md mb-sm text-center font-medium">
            {t('feedbackWidget.title')}
          </Title>
        ) : null}

        {openInput === null ? (
          <Flex className="justify-around">
            {Object.keys(OpenInput).map(key => {
              const inputKey = key as keyof typeof OpenInput
              return (
                <Stack key={key}>
                  <ActionIcon
                    variant="filled"
                    className="size-18 rounded-lg"
                    onClick={() => {
                      setOpenInput(OpenInput[inputKey])
                    }}
                  >
                    {icons[inputKey]}
                  </ActionIcon>

                  <Center>
                    <UnstyledButton>
                      {t(`feedbackWidget.${key.toLowerCase()}`)}
                    </UnstyledButton>
                  </Center>
                </Stack>
              )
            })}
          </Flex>
        ) : null}

        <Transition
          mounted={Boolean(openInput !== null)}
          transition="pop"
          duration={350}
          timingFunction="ease"
          exitDuration={0}
        >
          {styles => (
            <div style={styles}>
              <Box>
                {isLoading ? (
                  <Box className="h-25">
                    <LoadingSpinner show size="lg" />
                  </Box>
                ) : null}

                {!isLoading && (showSuccessMessage || showErrorMessage) ? (
                  <Stack>
                    <Center>
                      {showSuccessMessage ? (
                        <ThemeIcon variant="outline" className="size-15">
                          <IconCircleCheck className="size-15" />
                        </ThemeIcon>
                      ) : (
                        <IconCircleX className="size-15 stroke-red-600" />
                      )}
                    </Center>

                    <Center>
                      <Text>
                        {showSuccessMessage
                          ? t('feedbackWidget.successMessage')
                          : t('feedbackWidget.errorMessage')}
                      </Text>
                    </Center>
                  </Stack>
                ) : null}

                {!isLoading && !showSuccessMessage && !showErrorMessage ? (
                  <Box>
                    <Group className="gap-xs mb-md justify-evenly">
                      {Object.keys(OpenInput).map(key => {
                        const inputKey = key as keyof typeof OpenInput

                        return (
                          <Button
                            key={key}
                            size="sm"
                            variant={
                              openInput === OpenInput[inputKey]
                                ? 'filled'
                                : 'outline'
                            }
                            onClick={() => {
                              setOpenInput(OpenInput[inputKey])
                              reset()
                            }}
                            leftSection={icons[inputKey]}
                          >
                            {t(`feedbackWidget.${key.toLowerCase()}`)}
                          </Button>
                        )
                      })}
                    </Group>

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <Stack>
                        <ControlledTextarea
                          name="message"
                          control={control}
                          className="rounded-[50px]"
                          placeholder={
                            t('feedbackWidget.placeholder') as string
                          }
                        />

                        <Flex className="gap-xs">
                          <Tooltip
                            label={t('feedbackWidget.screenshot.label')}
                            className={
                              isCapturingScreenshot
                                ? 'w-[390px] rounded-md'
                                : ''
                            }
                          >
                            <ActionIcon
                              variant={screenshot ? 'filled' : 'outline'}
                              className="size-md"
                              aria-label={t('feedbackWidget.screenshot.label')}
                              onClick={() => {
                                setIsCapturingScreenshot(true)
                              }}
                            >
                              {screenshot ? (
                                <IconCameraCheck className="size-5" />
                              ) : (
                                <IconCameraPlus className="size-5" />
                              )}
                            </ActionIcon>
                          </Tooltip>

                          <Button type="submit" size="xs" fullWidth>
                            {t('feedbackWidget.button')}
                          </Button>
                        </Flex>
                      </Stack>
                    </form>
                  </Box>
                ) : null}
              </Box>
            </div>
          )}
        </Transition>
      </Dialog>
    </>
  )
}
