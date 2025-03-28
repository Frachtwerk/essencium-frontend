import { TranslationOutput } from '@frachtwerk/essencium-types'

export function mergeTranslations(
  translationResources: TranslationOutput | undefined,
  dbResources: TranslationOutput | undefined,
): TranslationOutput | null {
  if (typeof translationResources !== 'object' || !translationResources) {
    return dbResources ?? null
  }

  if (typeof dbResources !== 'object' || !dbResources) {
    return translationResources ?? null
  }

  const mergedTranslations: TranslationOutput = {
    ...translationResources,
  }

  Object.keys(dbResources).forEach((key: string) => {
    // if the key exists in dbResources and is an object, than call mergeTranslations recursively.
    if (
      Object.hasOwn(translationResources, key) &&
      typeof translationResources[key] === 'object' &&
      translationResources[key] !== null &&
      typeof dbResources[key] === 'object' &&
      dbResources[key] !== null
    ) {
      mergedTranslations[key] = mergeTranslations(
        translationResources[key],
        dbResources[key],
      )
    } else {
      // if key is a key value pair, take the value from dbResources.
      mergedTranslations[key] = dbResources[key]
    }
  })

  return mergedTranslations
}
