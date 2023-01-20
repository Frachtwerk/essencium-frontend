import { Box, Group, Text, UnstyledButton } from '@mantine/core'
import { IconChevronRight, IconUserCircle } from '@tabler/icons'

export function UserMenu() {
  return (
    <Box>
      <UnstyledButton
        sx={{
          display: 'block',
          width: '100%',
        }}
      >
        <Group
          sx={{
            padding: '7px',
            borderRadius: '6px',

            '&:hover': {
              backgroundColor: '#f3f4f6',
            },
          }}
          noWrap
        >
          <IconUserCircle size="28" />
          <Box sx={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              Admin User
            </Text>
            <Text color="dimmed" size="xs">
              admin@mail.com
            </Text>
          </Box>

          <IconChevronRight size={18} />
        </Group>
      </UnstyledButton>
    </Box>
  )
}
