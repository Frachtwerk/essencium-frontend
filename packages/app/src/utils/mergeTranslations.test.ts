import { TranslationOutput } from '@frachtwerk/essencium-types'
import { describe, expect, it } from 'vitest'

import { mergeTranslations } from './mergeTranslations'

const translationResources: TranslationOutput = {
  example: 'Hello',
  objectExpample: {
    firstTerm: 'Test',
    secondTerm: 'Test2',
  },
}

const dbResources: TranslationOutput = {
  example: 'Hello',
  objectExpample: {
    firstTerm: 'Updated Translation',
  },
}

const expectedMergedTranslations: TranslationOutput = {
  example: 'Hello',
  objectExpample: {
    firstTerm: 'Updated Translation',
    secondTerm: 'Test2',
  },
}

describe('mergeTranslations', () => {
  it('should return dbResources if translationResources is not an object', () => {
    const result = mergeTranslations(undefined, dbResources)

    expect(result).toEqual(dbResources)
  })

  it('should return translationResources if dbResources is not an object', () => {
    const result = mergeTranslations(translationResources, undefined)

    expect(result).toEqual(translationResources)
  })

  it('should return null if both translationResources and dbResources are undefined', () => {
    const result = mergeTranslations(undefined, undefined)

    expect(result).toBeNull()
  })

  it('should merge the two objects with dbResources overriding translationResources', () => {
    const result = mergeTranslations(translationResources, dbResources)

    expect(result).toEqual(expectedMergedTranslations)
  })
})
