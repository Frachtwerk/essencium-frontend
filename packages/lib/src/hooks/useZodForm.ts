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
    resolver: zodResolver(schema),
  })
}
