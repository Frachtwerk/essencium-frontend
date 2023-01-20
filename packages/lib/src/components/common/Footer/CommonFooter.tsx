import { Anchor, Flex, Footer, MediaQuery, Text } from '@mantine/core'
import { IconCopyright } from '@tabler/icons'
import { useTranslation } from 'react-i18next'

function CommonFooter() {
  const { t } = useTranslation()
  return (
    <Footer height={60} p="md">
      <Flex
        justify={{ base: 'center', xs: 'space-between' }}
        direction="row"
        wrap="wrap"
      >
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Flex gap="xs" align="center" sx={{ marginLeft: '5px' }}>
            <IconCopyright size="16" />
            <Text>{t('footer.license')}</Text>
          </Flex>
        </MediaQuery>
        <Flex direction="row" gap="xl">
          <Anchor href="/privacy">{t('footer.privacy')}</Anchor>
          <Anchor href="/imprint">{t('footer.imprint')}</Anchor>
          <Anchor href="/contact">{t('footer.contact')}</Anchor>
        </Flex>
      </Flex>
    </Footer>
  )
}

export default CommonFooter
