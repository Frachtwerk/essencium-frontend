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

import { Contact } from '@frachtwerk/essencium-lib'
import { contactFormSchema, ContactFormType } from '@frachtwerk/essencium-types'
import type { JSX } from 'react'

import { useSendContactMessage } from '@/api'
import { useZodForm } from '@/hooks'

export default function ContactView(): JSX.Element {
  const { mutate: sendMessage } = useSendContactMessage()

  const { handleSubmit, control, formState, reset } = useZodForm({
    schema: contactFormSchema,
    defaultValues: {
      mailAddress: '',
      name: '',
      subject: '',
      message: '',
    },
  })

  function onSubmit(form: ContactFormType): void {
    sendMessage(form, { onSuccess: () => reset() })
  }

  return (
    <form data-testid="form" onSubmit={handleSubmit(onSubmit)}>
      <Contact control={control} formState={formState} />
    </form>
  )
}
