import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Button, Text } from '@mantine/core'
import { TestComponent } from 'lib'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import useStore from '@/store'

interface Languages {
  en: { nativeName: string }
  de: { nativeName: string }
}

function App() {
  const { t, i18n } = useTranslation()

  const languages: Languages = {
    de: { nativeName: t('de') },
    en: { nativeName: t('en') },
  }

  const increaseCount = useStore(state => state.increaseCount)
  const dinoCount = useStore(state => state.dinos)

  const addUser = useStore(state => state.addUser)

  const users = useStore(state => state.users)

  useMemo(
    () =>
      addUser({
        id: Math.floor(Math.random() * 100),
        name: 'Daniel Dino',
        username: 'dinopower',
        email: 'dino@power.io',
      }),
    [addUser]
  )

  const [loadApiUsers, setLoadApiUsers] = useState(false)

  return (
    <Box className="grid place-items-center gap-4">
      <Text className="text-3xl font-bold font-mono pt-5">{t('itWorks')}</Text>
      <FontAwesomeIcon icon={faCoffee} size="3x" />
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

      <TestComponent users={users} shouldLoadApiUsers={loadApiUsers} />

      <Button onClick={() => setLoadApiUsers(!loadApiUsers)}>
        {loadApiUsers ? t('removeApiUsers') : t('loadApiUsers')}
      </Button>
    </Box>
  )
}

export default App
