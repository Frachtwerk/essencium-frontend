import { z } from 'zod'

z.config({
  customError: iss => {
    if (iss.code === 'invalid_type') {
      if (iss.input === null || iss.input === undefined)
        return 'validation.general.required'
    }

    if (iss.code === 'too_small') {
      if (iss.minimum === 1) return 'validation.general.required'
    }

    if (iss.code === 'invalid_type') {
      if (iss.expected === 'string') return 'validation.general.invalidString'

      if (iss.expected === 'number') return 'validation.general.invalidNumber'
    }

    if (iss.code === 'invalid_format') {
      if (iss.format === 'email') return 'validation.general.invalidEmail'
    }
  },
})
