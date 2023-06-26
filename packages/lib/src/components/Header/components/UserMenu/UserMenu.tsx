import { UserOutput } from '@frachtwerk/essencium-types'
import {
  Box,
  Group,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { IconChevronRight, IconUserCircle } from '@tabler/icons-react'
import NextLink from 'next/link'

type Props = {
  user: UserOutput
}

export function UserMenu({ user }: Props): JSX.Element {
  const theme = useMantineTheme()

  return (
    <Box>
      <NextLink href="/profile" style={{ textDecoration: 'none' }}>
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
                {user.firstName} {user.lastName}
              </Text>

              <Text color="dimmed" size="xs">
                {user.email}
              </Text>
            </Box>

            <IconChevronRight size={18} />
          </Group>
        </UnstyledButton>
      </NextLink>
    </Box>
  )
}
