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
import {
  useForm as useRhfForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'
import { TypeOf, ZodSchema } from 'zod'

interface UseZodFormProps<Z extends ZodSchema>
  extends Exclude<UseFormProps<TypeOf<Z>>, 'resolver'> {
  schema: Z
}

/**
 * A wrapper around react-hook-form's useForm hook that uses zod for validation.
 * @param schema The zod schema to use for validation.
 * @param formProps The props to pass to react-hook-form's useForm hook.
 * @returns The return value of react-hook-form's useForm hook.
 * @see https://react-hook-form.com/api/useform
 */
export function useZodForm<Z extends ZodSchema>({
  schema,
  ...formProps
}: UseZodFormProps<Z>): UseFormReturn<TypeOf<Z>, Z> {
  return useRhfForm({
    ...formProps,
    mode: 'onBlur',
    resolver: zodResolver(schema),
  })
}
