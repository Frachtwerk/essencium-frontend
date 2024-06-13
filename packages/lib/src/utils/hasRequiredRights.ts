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

import { RightOutput } from '@frachtwerk/essencium-types'

/**
 * This function checks if a user has the required rights.
 *
 * @param userRights - The rights of the user.
 * @param requiredRights - The rights required to access a certain part of the application. Can be a single right or an array of rights. If it is a one-dimensional array, the user must have all rights listed in the array. If it is a two-dimensional array, the user must have all rights listed in the outer array and at least one of the rights in the inner array(s). 
 *

 *
 * @returns True if the user has the required rights, false otherwise.
 */

export function hasRequiredRights(
  userRights: RightOutput['authority'][] | null | undefined,
  requiredRights:
    | (RightOutput['authority'] | RightOutput['authority'][])[]
    | RightOutput['authority'],
): boolean {
  if (!requiredRights || !userRights) return false

  if (!Array.isArray(requiredRights)) {
    return userRights.includes(requiredRights)
  }

  return requiredRights.every(rightSet =>
    Array.isArray(rightSet)
      ? rightSet.some(right => userRights?.includes(right))
      : userRights?.includes(rightSet),
  )
}
