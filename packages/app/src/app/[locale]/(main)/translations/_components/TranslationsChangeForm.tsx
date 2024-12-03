import {
  TranslationInput,
  TranslationOutput,
} from '@frachtwerk/essencium-types'
import { ActionIcon, Group, Stack, TextInput } from '@mantine/core'
import { IconBackspace, IconSend } from '@tabler/icons-react'
import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

import { useZodForm } from '@/hooks'

export const changeTranslationSchema = z.object({
  translation: z.string().min(2, 'validation.contact.subject'),
})

export type ChangeTranslationSchemaFormType = z.infer<
  typeof changeTranslationSchema
>

type Props = {
  currentValue: TranslationOutput['value']
  updateTranslation: (translationInput: TranslationInput) => void
  locale: TranslationInput['locale']
  keyPath: TranslationInput['key']
  deleteTranslation: (key: TranslationInput['key'], value: string) => void
}

export function TranslationChangeForm({
  currentValue,
  updateTranslation,
  locale,
  keyPath,
  deleteTranslation,
}: Props): JSX.Element {
  const { t } = useTranslation()

  const {
    handleSubmit,
    control,
    watch,
    reset: resetAndPrefillForm,
  } = useZodForm({
    schema: changeTranslationSchema,
    defaultValues: {
      translation: '',
    },
  })

  const fieldValue = watch('translation')

  function onSubmit(form: ChangeTranslationSchemaFormType): void {
    updateTranslation({
      locale,
      key: keyPath,
      translation: form.translation,
    })
  }

  useEffect(() => {
    resetAndPrefillForm({ translation: currentValue })
  }, [currentValue, resetAndPrefillForm])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <Group>
          <Controller
            name="translation"
            control={control}
            render={({ field }) => (
              <TextInput
                {...field}
                aria-label={t('translationView.form.changeTranslation')}
                withAsterisk
                w="40%"
                onChange={field.onChange}
                variant="unstyled"
              />
            )}
          />

          <ActionIcon type="submit" disabled={!fieldValue.length}>
            <IconSend size={18} />
          </ActionIcon>

          <ActionIcon onClick={() => deleteTranslation(keyPath, currentValue)}>
            <IconBackspace size={18} />
          </ActionIcon>
        </Group>
      </Stack>
    </form>
  )
}
