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
