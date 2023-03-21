import {
  Box,
  Group,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { IconChevronRight, IconUserCircle } from '@tabler/icons-react'
import { Link as RouterLink } from '@tanstack/react-router'

export function UserMenu(): JSX.Element {
  const theme = useMantineTheme()

  return (
    <Box>
      <RouterLink
        to="/profile"
        search={{}}
        params={{}}
        style={{ textDecoration: 'none' }}
      >
        <UnstyledButton
          sx={{
            display: 'block',
            width: '100%',
          }}
        >
          <Group
            p="sm"
            sx={{
              borderRadius: theme.radius.sm,
              '&:hover': {
                backgroundColor:
                  theme.colorScheme === 'dark'
                    ? theme.colors.gray[9]
                    : theme.colors.gray[0],
              },
            }}
            noWrap
          >
            <IconUserCircle size="28" />

            <Box sx={{ flex: 1 }}>
              <Text size="sm" weight="500">
                Admin User
              </Text>

              <Text color="dimmed" size="xs">
                admin@mail.com
              </Text>
            </Box>

            <IconChevronRight size={18} />
          </Group>
        </UnstyledButton>
      </RouterLink>
    </Box>
  )
}
