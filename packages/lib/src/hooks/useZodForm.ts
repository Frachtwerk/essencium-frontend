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

import { zodResolver } from '@hookform/resolvers/zod'
import type {
  FieldValues,
  Resolver,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

type UseZodFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
> = {
  schema: z.ZodType<TFieldValues>
} & Omit<UseFormProps<TFieldValues, TContext>, 'resolver'>

/**
 * A wrapper around react-hook-form's useForm hook that uses zod for validation.
 * @param schema The zod schema to use for validation.
 * @param formProps The props to pass to react-hook-form's useForm hook.
 * @returns The return value of react-hook-form's useForm hook.
 * @see https://react-hook-form.com/api/useform
 */
export function useZodForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
>({
  schema,
  ...formProps
}: UseZodFormProps<TFieldValues, TContext>): UseFormReturn<
  TFieldValues,
  TContext,
  TFieldValues
> {
  return useForm<TFieldValues, TContext, TFieldValues>({
    ...formProps,
    mode: 'onBlur',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any) as Resolver<TFieldValues, TContext>,
  })
}
