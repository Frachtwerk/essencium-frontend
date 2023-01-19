import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core'

interface LinkProps {
  icon: React.ReactNode
  color: string
  label: string
  href: string
}

function Link({ icon, color, label, href }: LinkProps) {
  return (
    <UnstyledButton
      sx={{
        display: 'block',
        minWidth: '200px',
        maxWidth: 'max-content',
        height: 'auto',
        padding: '6px',
        borderRadius: '6px',

        '&:hover': {
          backgroundColor: '#f3f4f6',
        },
      }}
    >
      <Group>
        <ThemeIcon color={color} variant="light" size={40}>
          {icon}
        </ThemeIcon>

        <Text size="md">{label}</Text>
      </Group>
    </UnstyledButton>
  )
}

export default Link
