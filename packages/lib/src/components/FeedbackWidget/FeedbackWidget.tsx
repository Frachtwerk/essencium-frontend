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
  FeedbackFormType,
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
  Loader,
  rem,
  Stack,
  Text,
  Textarea,
  Title,
  Transition,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconBulb,
  IconCircleCheck,
  IconCircleX,
  IconExclamationCircle,
  IconMessageDots,
} from '@tabler/icons-react'
import html2canvas from 'html2canvas'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'

import { useZodForm } from '../../hooks'

type Props = {
  createFeedback: (feedback: FeedbackInput) => void
  currentUser: UserOutput | null
  feedbackCreated: boolean
  feedbackFailed: boolean
  feedbackSending: boolean
}

export function FeedBackWidget({
  createFeedback,
  currentUser,
  feedbackCreated,
  feedbackFailed,
  feedbackSending,
}: Props): JSX.Element {
  const theme = useMantineTheme()

  const { t } = useTranslation()

  const [opened, { toggle, close }] = useDisclosure(false)

  const [openInput, setOpenInput] = useState<OpenInputTypeValues | null>(null)

  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false)

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [screenshot, setScreenshot] = useState<string | null>(null)

  console.log(screenshot)

  const { handleSubmit, control, formState, reset } = useZodForm({
    schema: feedbackFormSchema,
  })

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
  }

  setTimeout(() => {
    if (showSuccessMessage || showErrorMessage) {
      onCloseWidget()
    }
  }, 3500)

  function onSubmit(form: FeedbackFormType): void {
    if (!currentUser) return

    createFeedback({
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      feedbackType: openInput || OpenInput.Other,
      message: form.message,
    })
  }

  // TODO: add button for Screenshot in Widget
  // TODO: add file to feedbackInput and send it with email

  function handleScreebshot(): void {
    html2canvas(document.body).then(function (canvas) {
      /*   const dataUrl = canvas.toDataURL()
      const newTab = window.open()
      if (newTab) newTab.document.body.innerHTML = `<img src="${dataUrl}">`
       */
      canvas.toBlob(function (blob) {
        if (blob) {
          setScreenshot(URL.createObjectURL(blob))
        }
      })
    })
  }

  return (
    <>
      <ActionIcon
        variant="filled"
        color={theme.colors.blue[6]}
        size="xl"
        radius="xl"
        style={{
          position: 'fixed',
          bottom: rem(80),
          right: rem(10),
          zIndex: '20',
        }}
        onClick={toggle}
      >
        <IconMessageDots size={30} />
      </ActionIcon>

      <Dialog
        opened={opened}
        withCloseButton
        onClose={() => {
          onCloseWidget()
        }}
        sx={{ width: '390px', height: openInput ? 'auto' : '180px' }}
        radius="md"
        position={{ bottom: 100, right: 80 }}
      >
        {!showSuccessMessage || !showErrorMessage ? (
          <Title order={4} align="center" size="sm" mb="sm" weight={500}>
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
                    color="blue"
                    variant="filled"
                    size={70}
                    style={{ borderRadius: '20px' }}
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
                  <Box h={rem(100)}>
                    <Center>
                      <Loader mt="xl" />
                    </Center>
                  </Box>
                ) : null}

                {!isLoading && (showSuccessMessage || showErrorMessage) ? (
                  <Stack>
                    <Center>
                      {showSuccessMessage ? (
                        <IconCircleCheck
                          size={60}
                          stroke={1.5}
                          color={theme.colors.blue[6]}
                        />
                      ) : (
                        <IconCircleX
                          size={60}
                          stroke={1.5}
                          color={theme.colors.red[6]}
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
                    <Group position="apart" spacing="xs" mb="md">
                      {Object.keys(OpenInput).map(key => {
                        const inputKey = key as keyof typeof OpenInput

                        return (
                          <Button
                            key={key}
                            p="5px"
                            sx={{ width: '110px', height: '32px' }}
                            variant={
                              openInput === OpenInput[inputKey]
                                ? 'filled'
                                : 'outline'
                            }
                            onClick={() => {
                              setOpenInput(OpenInput[inputKey])
                              reset()
                            }}
                            leftIcon={icons[inputKey]}
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
                            sx={{
                              borderRadius: '50px',
                              marginBottom: '15px',
                            }}
                            placeholder={
                              t('feedbackWidget.placeholder') as string
                            }
                          />
                        )}
                      />

                      <Box h="0.8rem" mt="-0.8rem" mb="0.6em">
                        {formState.errors.message && (
                          <Text ml={5} fz="xs" color="red">
                            {formState.errors.message?.message
                              ? String(t(formState.errors.message.message))
                              : null}
                          </Text>
                        )}
                      </Box>

                      <Button type="submit" size="xs" fullWidth>
                        {t('feedbackWidget.button')}
                      </Button>
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
