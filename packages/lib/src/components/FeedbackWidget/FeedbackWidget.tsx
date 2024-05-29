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
  Textarea,
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
import html2canvas from 'html2canvas'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { ReactNode, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

import { useZodForm } from '../../hooks'
import { LoadingSpinner } from '../LoadingSpinner'
import classes from './FeedbackWidget.module.css'

type NotificationParams = {
  notificationType: 'created' | 'updated' | 'deleted'
  color: 'success' | 'error'
  message: ReactNode
}

type Props = {
  createFeedback: (feedback: FeedbackInput) => void
  currentUser: UserOutput | null
  feedbackCreated: boolean
  feedbackFailed: boolean
  feedbackSending: boolean
  createNotification: (params: NotificationParams) => void
}

export function FeedbackWidget({
  createFeedback,
  currentUser,
  feedbackCreated,
  feedbackFailed,
  feedbackSending,
  createNotification,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const router = useRouter()

  const [opened, { toggle, close }] = useDisclosure(false)

  const [openInput, setOpenInput] = useState<OpenInputTypeValues | null>(null)

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [screenshot, setScreenshot] = useState<string | null>(null)

  const [isCapturingScreenshot, setIsCapturingScreenshot] =
    useState<boolean>(false)

  const { handleSubmit, control, formState, reset, setValue } = useZodForm({
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
    setValue('path', router.asPath || '')
  }, [currentUser, openInput, screenshot, router.asPath, setValue])

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

    createFeedback({
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      feedbackType: openInput || OpenInput.Other,
      message: form.message,
      screenshot: screenshot || '',
      path: router.asPath,
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
        size="lg"
        radius="xl"
        style={{
          zIndex: 20,
        }}
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
        h={openInput ? 'auto' : '180px'}
        className={
          isCapturingScreenshot
            ? classes['feedback-widget__dialog--display']
            : classes['feedback-widget__dialog']
        }
      >
        {!showSuccessMessage || !showErrorMessage ? (
          <Title className={classes['feedback-widget__title']}>
            {t('feedbackWidget.title')}
          </Title>
        ) : null}

        {openInput === null ? (
          <Flex justify="space-around">
            {Object.keys(OpenInput).map(key => {
              const inputKey = key as keyof typeof OpenInput
              return (
                <Stack key={key}>
                  <ActionIcon
                    variant="filled"
                    className={classes['feedback-widget__action-icon']}
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
                  <Box
                    className={
                      classes['feedback-widget__loading-spinner--container']
                    }
                  >
                    <LoadingSpinner show size="lg" />
                  </Box>
                ) : null}

                {!isLoading && (showSuccessMessage || showErrorMessage) ? (
                  <Stack>
                    <Center>
                      {showSuccessMessage ? (
                        <ThemeIcon
                          variant="outline"
                          className={classes['feedback-widget__theme-icon']}
                        >
                          <IconCircleCheck
                            className={classes['feedback-widget__icon--check']}
                          />
                        </ThemeIcon>
                      ) : (
                        <IconCircleX
                          className={classes['feedback-widget__icon--x']}
                        />
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
                    <Group
                      justify="apart"
                      gap="xs"
                      className={classes['feedback-widget__group']}
                    >
                      {Object.keys(OpenInput).map(key => {
                        const inputKey = key as keyof typeof OpenInput

                        return (
                          <Button
                            key={key}
                            className={classes['feedback-widget__button']}
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
                      <Controller
                        name="message"
                        control={control}
                        render={({ field }) => (
                          <Textarea
                            {...field}
                            className={classes['feedback-widget__textarea']}
                            placeholder={
                              t('feedbackWidget.placeholder') as string
                            }
                          />
                        )}
                      />

                      <Box className={classes['feedback-widget__error-box']}>
                        {formState.errors.message && (
                          <Text
                            className={classes['feedback-widget__error-text']}
                          >
                            {formState.errors.message?.message
                              ? String(t(formState.errors.message.message))
                              : null}
                          </Text>
                        )}
                      </Box>

                      <Flex gap="xs">
                        <Tooltip
                          label={t('feedbackWidget.screenshot.label')}
                          className={
                            isCapturingScreenshot
                              ? classes['feedback-widget__dialog--display']
                              : ''
                          }
                        >
                          <ActionIcon
                            variant={screenshot ? 'filled' : 'outline'}
                            size="md"
                            onClick={() => {
                              setIsCapturingScreenshot(true)
                            }}
                          >
                            {screenshot ? (
                              <IconCameraCheck size={20} />
                            ) : (
                              <IconCameraPlus size={20} />
                            )}
                          </ActionIcon>
                        </Tooltip>

                        <Button type="submit" size="xs" fullWidth>
                          {t('feedbackWidget.button')}
                        </Button>
                      </Flex>
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
