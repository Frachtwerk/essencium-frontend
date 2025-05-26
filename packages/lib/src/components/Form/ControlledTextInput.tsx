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

import { TextInput, TextInputProps } from '@mantine/core'
import { type JSX } from 'react'
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form'

import { InputErrorStack } from './InputErrorStack'

type ControlledTextInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
  control: Control<TFieldValues>
} & TextInputProps

export function ControlledTextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  ...props
}: ControlledTextInputProps<TFieldValues, TName>): JSX.Element {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <InputErrorStack message={fieldState.error?.message}>
          <TextInput
            {...field}
            onChange={event => {
              field.onChange(event)
              props.onChange?.(event)
            }}
            onBlur={event => {
              field.onBlur()
              props.onBlur?.(event)
            }}
            error={fieldState.invalid}
            {...props}
          />
        </InputErrorStack>
      )}
    />
  )
}
