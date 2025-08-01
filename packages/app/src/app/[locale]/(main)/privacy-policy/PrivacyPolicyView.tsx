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

export default function PrivacyPolicyView(): JSX.Element {
  const { t } = useTranslation()

  return (
    <Card
      withBorder
      className="p-lg mx-auto my-3 max-w-[800px] rounded-md shadow-sm"
    >
      <Stack className="gap-lg">
        {/* Header */}
        <Title order={1}>{t('privacyPolicyView.title')}</Title>
        <Divider />

        {/* Introduction */}
        <Title order={2}>{t('privacyPolicyView.introduction')}</Title>
        <Text>
          This Privacy Policy explains how our company collects, uses, and
          protects your personal data. We are committed to ensuring that your
          privacy is protected. In this policy, you will find details about how
          we handle your information.
        </Text>
        <Divider />

        {/* Data Collection */}
        <Title order={2}>{t('privacyPolicyView.dataCollection')}</Title>
        <Text>
          We collect information that you provide directly to us, such as when
          you create an account, subscribe to our newsletter, or contact us with
          inquiries. This may include your name, email address, phone number,
          and other personal details.
        </Text>
        <Divider />

        {/* Data Usage */}
        <Title order={2}>{t('privacyPolicyView.dataUsage')}</Title>
        <Text>
          The data we collect is used to improve our services, maintain our
          website, and communicate with you. We may use your information to
          personalize your experience and inform you of updates or new services
          that we offer.
        </Text>
        <Divider />

        {/* Data Protection */}
        <Title order={2}>{t('privacyPolicyView.dataProtection')}</Title>
        <Text>
          We implement a variety of security measures to ensure the safety of
          your personal data. These measures include secure data storage,
          encryption, and regular security reviews. Our data protection
          practices comply with current legal standards.
        </Text>
        <Divider />

        {/* Contact Information */}
        <Title order={2}>{t('privacyPolicyView.contactInformation')}</Title>
        <Text>
          If you have any questions about this Privacy Policy or wish to
          exercise your rights regarding your personal data, please contact us
          at:
          <br />
          Email: privacy@frachtwerk.de
          <br />
          Phone: +49 (0) 721/7654321
        </Text>
      </Stack>
    </Card>
  )
}
