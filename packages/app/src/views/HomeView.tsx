import { Box, Button, Center, Text } from '@mantine/core'
import { Home } from 'lib'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import useStore from '@/store'

interface Languages {
  en: { nativeName: string }
  de: { nativeName: string }
}

export function Demo(): JSX.Element {
  const { t, i18n } = useTranslation()

  const languages: Languages = {
    de: { nativeName: t('de') },
    en: { nativeName: t('en') },
  }

  const increaseCount = useStore(state => state.increaseCount)
  const dinoCount = useStore(state => state.dinos)

  const [loadApiUsers, setLoadApiUsers] = useState(false)

  return (
    <Center sx={{ width: '100%', height: '80%' }}>
      <Box className="grid place-items-center gap-4">
        <Text className="text-3xl font-bold font-mono pt-5">
          {t('itWorks')}
        </Text>
        <Button
          onClick={() => {
            throw Error('failed intentionally with Sentry')
          }}
        >
          Get started
        </Button>

        <Text className="text-3xl font-bold font-mono p-5">{t('dino')}</Text>

        <Box>
          {Object.keys(languages).map(language => (
            <Button
              key={language}
              type="submit"
              onClick={() => i18n.changeLanguage(language)}
              className="mx-2"
              variant="light"
            >
              {languages[language as keyof Languages].nativeName}
            </Button>
          ))}
        </Box>

        <Box>
          <Button
            variant="gradient"
            gradient={{ from: 'teal', to: 'blue', deg: 60 }}
            onClick={increaseCount}
          >
            Add Dinos
          </Button>

          <Text className="mt-5 text-center">{dinoCount} Dinos</Text>
        </Box>

        <Button onClick={() => setLoadApiUsers(!loadApiUsers)}>
          {loadApiUsers ? t('removeApiUsers') : t('loadApiUsers')}
        </Button>
      </Box>
    </Center>
  )
}

export function HomeView(): JSX.Element {
  return <Home />
}
