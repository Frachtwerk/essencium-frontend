'use client'

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

import { Card, Divider, Stack, Text, Title } from '@mantine/core'
import type { JSX } from 'react'
import { useTranslation } from 'react-i18next'

import classes from './LegalNoticeView.module.css'

export default function LegalNoticeView(): JSX.Element {
  const { t } = useTranslation()

  return (
    <Card withBorder className={classes['legal-notice-card']}>
      <Stack gap="lg">
        <Title order={1}>{t('legalNoticeView.title')}</Title>
        <Divider />

        {/* Company Information */}
        <Title order={2}>{t('legalNoticeView.companyInformation')}</Title>
        <Text>Frachtwerk GmbH</Text>
        <Text>Leopoldstraße 7C</Text>
        <Text>76133 Karlsruhe</Text>
        <Text>Germany</Text>
        <Text>Phone: +49 (0) 721/1234567</Text>
        <Text>Email: info@frachtwerk.de</Text>
        <Text>Managing Director: Max Mustermann</Text>
        <Divider />

        {/* Regulatory Authority (if any) */}
        <Title order={2}>{t('legalNoticeView.regulatoryAuthority')}</Title>
        <Text>
          Example Regulatory Authority <br />
          Musterstraße 1 <br />
          12345 Musterstadt
        </Text>
        <Divider />

        {/* Disclaimer */}
        <Title order={2}>{t('legalNoticeView.dsiclaimer')}</Title>
        <Text>
          Despite careful review of content, we assume no liability for the
          content of external links. The providers of the linked pages are
          solely responsible for their content.
        </Text>
        <Divider />

        {/* Copyright / Legal Notice */}
        <Title order={2}>{t('legalNoticeView.copyright')}</Title>
        <Text>
          The content and works created by the site operators on these pages are
          subject to German copyright law. Reproduction, processing,
          distribution and any form of commercialization beyond the scope of
          copyright law require the written consent of the respective author or
          creator.
        </Text>
      </Stack>
    </Card>
  )
}
