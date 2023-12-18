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
  rem,
  Stack,
  Text,
  Textarea,
  Title,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconBulb,
  IconExclamationCircle,
  IconMessageDots,
} from '@tabler/icons-react'
import { useTranslation } from 'next-i18next'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

import { useZodForm } from '../../hooks'

type Props = {
  createFeedback: (feedback: FeedbackInput) => void
  currentUser: UserOutput | null
}

export function FeedBackWidget({
  createFeedback,
  currentUser,
}: Props): JSX.Element {
  const theme = useMantineTheme()

  const { t } = useTranslation()

  const [opened, { toggle, close }] = useDisclosure(false)
  const [openInput, setOpenInput] = useState<OpenInputTypeValues | null>(null)

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
  const { handleSubmit, control, formState, reset } = useZodForm({
    schema: feedbackFormSchema,
  })

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
          close()
          setOpenInput(null)
          reset()
        }}
        sx={{ width: '390px', height: openInput ? 'auto' : '180px' }}
        radius="md"
        position={{ bottom: 100, right: 80 }}
      >
        <Title order={4} align="center" size="sm" mb="sm" weight={500}>
          {t('feedbackWidget.title')}
        </Title>

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

        {openInput !== null ? (
          <Box sx={{ transition: 'ease-in-out', opacity: 1 }}>
            <Group position="apart" spacing="xs" mb="md">
              {Object.keys(OpenInput).map(key => {
                const inputKey = key as keyof typeof OpenInput

                return (
                  <Button
                    key={key}
                    p="5px"
                    sx={{ width: '110px', height: '32px' }}
                    variant={
                      openInput === OpenInput[inputKey] ? 'filled' : 'outline'
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
                    sx={{ borderRadius: '50px', marginBottom: '15px' }}
                    placeholder={t('feedbackWidget.placeholder') as string}
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
      </Dialog>
    </>
  )
}
