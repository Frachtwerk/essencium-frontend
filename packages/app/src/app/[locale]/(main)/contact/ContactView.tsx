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
import { useAtomValue } from 'jotai'
import { type JSX } from 'react'

import { userAtom, useSendContactMessage } from '@/api'
import { useZodForm } from '@/hooks'

export default function ContactView(): JSX.Element {
  const { mutate: sendMessage } = useSendContactMessage()

  const currentUser = useAtomValue(userAtom)

  const defaultValues = { mailAddress: '', name: '', subject: '', message: '' }

  const {
    handleSubmit,
    control,
    reset: resetAndPrefillForm,
  } = useZodForm({
    schema: contactFormSchema,
    defaultValues,
  })

  const contactPerson = {
    name: 'Sandra Galuba',
    phone: '+49 30 209669462',
    email: 'contact@frachtwerk.de',
    address: 'Große Präsidentenstraße 10, 10178 Berlin',
    linkedinUrl: 'https://www.linkedin.com/company/frachtwerk',
    instagramUrl: 'https://www.instagram.com/frachtwerk.de/',
  }

  function onSubmit(form: ContactFormType): void {
    sendMessage(
      {
        ...form,
        name: `${currentUser?.firstName ?? ''} ${currentUser?.lastName ?? ''}`,
        mailAddress: currentUser?.email ?? '',
      },
      { onSuccess: () => resetAndPrefillForm(defaultValues) },
    )
  }

  return (
    <form data-testid="form" onSubmit={handleSubmit(onSubmit)}>
      <Contact control={control} contactPerson={contactPerson} />
    </form>
  )
}
