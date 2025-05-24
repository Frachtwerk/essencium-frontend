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

import { Textarea, TextareaProps } from '@mantine/core'
import { type JSX } from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

import { useFormStateErrorMessage } from '../../hooks'
import { InputErrorStack } from './InputErrorStack'

type ControlledTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
  control: Control<TFieldValues>
} & TextareaProps

export function ControlledTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  ...props
}: ControlledTextareaProps<TFieldValues, TName>): JSX.Element {
  const { message } = useFormStateErrorMessage({
    control,
    name,
  })

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <InputErrorStack message={message}>
          <Textarea {...field} error={Boolean(message)} {...props} />
        </InputErrorStack>
      )}
    />
  )
}
