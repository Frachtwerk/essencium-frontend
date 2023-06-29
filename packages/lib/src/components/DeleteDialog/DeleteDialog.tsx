import { Button, Flex, Modal, Text, Title } from '@mantine/core'
import { t } from 'i18next'

type Props = {
  deleteFunction: () => void
  title: string
  text: string
  opened: boolean
  onClose: () => void
}

export function DeleteDialog({
  deleteFunction,
  title,
  text,
  opened,
  onClose,
}: Props): JSX.Element {
  return (
    <Modal
      opened={opened}
      closeOnClickOutside={false}
      closeOnEscape
      onClose={onClose}
      withCloseButton={false}
      padding="lg"
      centered
    >
      <Title order={4} mb="md">
        {title}
      </Title>

      <Text mb="md">{text}</Text>

      <Flex justify="space-around" gap="lg">
        <Button fullWidth mt="md" onClick={deleteFunction}>
          {t('actions.delete')}
        </Button>

        <Button variant="subtle" fullWidth mt="md" onClick={onClose}>
          {t('actions.cancel')}
        </Button>
      </Flex>
    </Modal>
  )
}
