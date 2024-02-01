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

import { Button, Center, Container, Flex, Stack } from '@mantine/core'
import { openSpotlight } from '@mantine/spotlight'
import { IconSearch, IconUserEdit, IconUsers } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import classes from './Home.module.css'

export function Home(): JSX.Element {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Flex
      direction="column"
      gap="lg"
      align="center"
      justify="center"
      className={classes.flex}
    >
      <Center my="xl">
        <Image
          src="/img/web/emblem_400x400px.svg"
          alt={t('header.logo')}
          width={200}
          height={200}
        />
      </Center>

      <Container w={300}>
        <Stack>
          <Button
            onClick={() => openSpotlight()}
            variant="outline"
            leftSection={<IconSearch />}
            fullWidth
          >
            {t('homeView.action.search')}
          </Button>
          <Button
            onClick={() => router.push('/users')}
            variant="outline"
            leftSection={<IconUsers />}
            fullWidth
          >
            {t('homeView.action.users')}
          </Button>
          <Button
            onClick={() => router.push('/profile')}
            variant="outline"
            leftSection={<IconUserEdit />}
            fullWidth
          >
            {t('homeView.action.profile')}
          </Button>
        </Stack>
      </Container>
    </Flex>
  )
}
