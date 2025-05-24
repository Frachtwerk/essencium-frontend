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
  FieldPath,
  FieldValues,
  get,
  useFormState,
  UseFormStateProps,
  UseFormStateReturn,
} from 'react-hook-form'

export type UseFormStateErrorMessageProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
} & UseFormStateProps<TFieldValues>

export type UseFormStateErrorMessageReturn<
  TFieldValues extends FieldValues = FieldValues,
> = {
  message: string | undefined
} & UseFormStateReturn<TFieldValues>

export function useFormStateErrorMessage<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  ...formStateProps
}: UseFormStateErrorMessageProps<
  TFieldValues,
  TName
>): UseFormStateErrorMessageReturn<TFieldValues> {
  const { errors, ...formState } = useFormState<TFieldValues>({
    name,
    ...formStateProps,
  })

  const message: string | undefined = get(errors, name)?.message

  return {
    ...formState,
    errors,
    message,
  }
}
