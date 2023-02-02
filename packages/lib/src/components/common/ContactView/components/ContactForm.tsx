import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core'
import { IconSend } from '@tabler/icons'
import { useTranslation } from 'react-i18next'

export function ContactForm() {
  const { t } = useTranslation()

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <form>
        <Title order={3} mb="md">
          {t('ContactForm.title')}
        </Title>

        <Grid gutter={30}>
          <Grid.Col md={6}>
            <Container p={0} m={0}>
              <TextInput
                mb="md"
                label={t('ContactForm.form.email')}
                withAsterisk
                size="sm"
                radius="md"
              />

              <TextInput
                mb="md"
                label={t('ContactForm.form.name')}
                size="sm"
                radius="md"
              />

              <TextInput
                mb="md"
                label={t('ContactForm.form.number')}
                size="sm"
                radius="md"
              />
            </Container>
          </Grid.Col>

          <Grid.Col md={6}>
            <TextInput
              mb="md"
              label={t('ContactForm.form.subject')}
              size="sm"
              radius="md"
              variant="filled"
            />

            <Textarea
              placeholder="Write your message here"
              label={t('ContactForm.form.message')}
              withAsterisk
              minRows={8}
              maxRows={15}
              miw="45%"
              variant="filled"
            />
          </Grid.Col>
        </Grid>

        <Group position="right" mt="md">
          <Button leftIcon={<IconSend size={20} />}>
            {t('ContactForm.form.sendMessage')}
          </Button>
        </Group>
      </form>
    </Card>
  )
}
