import { UserSource } from '@frachtwerk/essencium-types'
import { assert, beforeEach, describe, expect, it, vi } from 'vitest'

import { getAuthStateFromToken } from './auth'

vi.mock('@/utils', () => ({
  parseJwt: vi.fn(),
}))

import { parseJwt } from '@/utils'

const mockParseJwt = vi.mocked(parseJwt)

const BASE_PAYLOAD = {
  expiringIn: 3600000,
  exp: Math.floor(Date.now() / 1000) + 3600,
  uid: 42,
  sub: 'user@example.com',
  firstName: 'Jane',
  lastName: 'Doe',
  locale: 'de',
  mobile: '+49123456789',
  phone: '+49987654321',
  source: UserSource.LOCAL,
  rights: ['ROLE_READ', 'USER_READ'],
  roles: ['ADMIN'],
}

describe('getAuthStateFromToken', () => {
  beforeEach(() => {
    mockParseJwt.mockReset()
  })

  it('returns null when token cannot be parsed', () => {
    mockParseJwt.mockReturnValue(null)
    expect(getAuthStateFromToken('invalid.token')).toBeNull()
  })

  it('returns null when uid is missing', () => {
    mockParseJwt.mockReturnValue({
      ...BASE_PAYLOAD,
      uid: undefined,
    })
    expect(getAuthStateFromToken('token')).toBeNull()
  })

  it('returns null when sub is missing', () => {
    mockParseJwt.mockReturnValue({
      ...BASE_PAYLOAD,
      sub: undefined,
    })
    expect(getAuthStateFromToken('token')).toBeNull()
  })

  it('returns null when firstName and given_name are both missing', () => {
    const { firstName: _f, ...rest } = BASE_PAYLOAD
    mockParseJwt.mockReturnValue({ ...rest })
    expect(getAuthStateFromToken('token')).toBeNull()
  })

  it('returns null when lastName and family_name are both missing', () => {
    const { lastName: _l, ...rest } = BASE_PAYLOAD
    mockParseJwt.mockReturnValue({ ...rest })
    expect(getAuthStateFromToken('token')).toBeNull()
  })

  it('maps standard firstName/lastName claims correctly', () => {
    mockParseJwt.mockReturnValue({ ...BASE_PAYLOAD })

    const result = getAuthStateFromToken('token')

    assert(result !== null)
    expect(result.user.firstName).toBe('Jane')
    expect(result.user.lastName).toBe('Doe')
  })

  it('maps OIDC given_name/family_name claims as alternative to firstName/lastName', () => {
    const { firstName: _f, lastName: _l, ...rest } = BASE_PAYLOAD
    mockParseJwt.mockReturnValue({
      ...rest,
      given_name: 'John',
      family_name: 'Smith',
    })

    const result = getAuthStateFromToken('token')

    assert(result !== null)
    expect(result.user.firstName).toBe('John')
    expect(result.user.lastName).toBe('Smith')
  })

  it('prefers given_name/family_name over firstName/lastName when both are present', () => {
    mockParseJwt.mockReturnValue({
      ...BASE_PAYLOAD,
      given_name: 'OIDC',
      family_name: 'Name',
    })

    const result = getAuthStateFromToken('token')

    assert(result !== null)
    expect(result.user.firstName).toBe('OIDC')
    expect(result.user.lastName).toBe('Name')
  })

  it('returns correct user and rights for a valid payload', () => {
    mockParseJwt.mockReturnValue({ ...BASE_PAYLOAD })

    const result = getAuthStateFromToken('token')

    assert(result !== null)
    expect(result.user).toMatchObject({
      id: 42,
      email: 'user@example.com',
      firstName: 'Jane',
      lastName: 'Doe',
      enabled: true,
      locale: 'de',
      mobile: '+49123456789',
      phone: '+49987654321',
      source: UserSource.LOCAL,
      createdAt: null,
      createdBy: null,
      updatedAt: null,
      updatedBy: null,
    })
    expect(result.rights).toEqual(['ROLE_READ', 'USER_READ'])
  })

  it('includes explicit null baseProperties fields', () => {
    mockParseJwt.mockReturnValue({ ...BASE_PAYLOAD })

    const result = getAuthStateFromToken('token')

    assert(result !== null)
    expect(result.user.createdAt).toBeNull()
    expect(result.user.createdBy).toBeNull()
    expect(result.user.updatedAt).toBeNull()
    expect(result.user.updatedBy).toBeNull()
  })

  it('handles string uid', () => {
    mockParseJwt.mockReturnValue({ ...BASE_PAYLOAD, uid: 'uuid-1234' })

    const result = getAuthStateFromToken('token')

    assert(result !== null)
    expect(result.user.id).toBe('uuid-1234')
  })

  it('returns empty arrays for rights and roles when absent', () => {
    mockParseJwt.mockReturnValue({
      ...BASE_PAYLOAD,
      rights: [],
      roles: [],
    })

    const result = getAuthStateFromToken('token')

    assert(result !== null)
    expect(result.rights).toEqual([])
    expect(result.user.roles).toEqual([])
  })

  it('filters non-string values out of rights and roles arrays', () => {
    mockParseJwt.mockReturnValue({
      ...BASE_PAYLOAD,
      rights: ['ROLE_READ', 42, null, 'USER_READ'],
      roles: ['ADMIN', true],
    })

    const result = getAuthStateFromToken('token')

    assert(result !== null)
    expect(result.rights).toEqual(['ROLE_READ', 'USER_READ'])
    expect(result.user.roles).toHaveLength(1)
    expect(result.user.roles[0].name).toBe('ADMIN')
  })

  it('uses payload.source when present', () => {
    mockParseJwt.mockReturnValue({ ...BASE_PAYLOAD, source: 'google' })

    const result = getAuthStateFromToken('token')

    assert(result !== null)
    expect(result.user.source).toBe('google')
  })

  it('falls back to payload.userSource when source is absent', () => {
    const { source: _s, ...rest } = BASE_PAYLOAD
    mockParseJwt.mockReturnValue({ ...rest, userSource: 'github' })

    const result = getAuthStateFromToken('token')

    assert(result !== null)
    expect(result.user.source).toBe('github')
  })

  it('falls back to UserSource.LOCAL when both source and userSource are absent', () => {
    const { source: _s, ...rest } = BASE_PAYLOAD
    mockParseJwt.mockReturnValue({ ...rest })

    const result = getAuthStateFromToken('token')

    assert(result !== null)
    expect(result.user.source).toBe(UserSource.LOCAL)
  })

  it('defaults locale to "en" when missing', () => {
    const { locale: _l, ...rest } = BASE_PAYLOAD
    mockParseJwt.mockReturnValue({ ...rest })

    const result = getAuthStateFromToken('token')

    assert(result !== null)
    expect(result.user.locale).toBe('en')
  })

  it('defaults mobile and phone to empty string when missing', () => {
    const { mobile: _m, phone: _p, ...rest } = BASE_PAYLOAD
    mockParseJwt.mockReturnValue({ ...rest })

    const result = getAuthStateFromToken('token')

    assert(result !== null)
    expect(result.user.mobile).toBe('')
    expect(result.user.phone).toBe('')
  })
})
