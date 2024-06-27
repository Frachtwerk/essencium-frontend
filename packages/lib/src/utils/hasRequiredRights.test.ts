import { RIGHTS } from '@frachtwerk/essencium-types'
import { describe, expect, it } from 'vitest'

import { hasRequiredRights } from './hasRequiredRights'

describe('hasRequiredRights', () => {
  it('should return true if the user has all the required rights', () => {
    const userRights = [RIGHTS.USER_READ, RIGHTS.USER_CREATE]
    const requiredRights = [RIGHTS.USER_READ, RIGHTS.USER_CREATE]

    const result = hasRequiredRights(userRights, requiredRights)

    expect(result).toBe(true)
  })

  it('should return true if the user has all the required rights in the outer array and at least one right in the inner array', () => {
    const userRights = [RIGHTS.USER_READ, RIGHTS.USER_CREATE]
    const requiredRights = [
      [RIGHTS.USER_CREATE, RIGHTS.USER_UPDATE],
      RIGHTS.USER_READ,
    ]

    const result = hasRequiredRights(userRights, requiredRights)

    expect(result).toBe(true)
  })

  it('should return false if the user does not have all the required rights', () => {
    const userRights = [RIGHTS.USER_UPDATE, RIGHTS.USER_READ]
    const requiredRights = [
      RIGHTS.USER_UPDATE,
      RIGHTS.USER_READ,
      RIGHTS.USER_CREATE,
    ]

    const result = hasRequiredRights(userRights, requiredRights)

    expect(result).toBe(false)
  })

  it('should return false if the user does not have all the required rights in the outer array', () => {
    const userRights = [
      RIGHTS.USER_UPDATE,
      RIGHTS.USER_READ,
      RIGHTS.USER_DELETE,
    ]
    const requiredRights = [
      [RIGHTS.USER_UPDATE, RIGHTS.USER_READ, RIGHTS.USER_DELETE],
      RIGHTS.USER_CREATE,
    ]

    const result = hasRequiredRights(userRights, requiredRights)

    expect(result).toBe(false)
  })

  it('should return false if the user does not have any rights', () => {
    const userRights = null
    const requiredRights = [
      RIGHTS.USER_UPDATE,
      RIGHTS.USER_READ,
      RIGHTS.USER_DELETE,
    ]

    const result = hasRequiredRights(userRights, requiredRights)

    expect(result).toBe(false)
  })
})
