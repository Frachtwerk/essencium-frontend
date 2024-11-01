import { Group, Text } from '@mantine/core'
import { IconCircleCheck, IconCircleX } from '@tabler/icons-react'

import classes from './PasswordRequirement.module.css'

type Props = {
  meets: boolean
  label: string
}

export function PasswordRequirement({ meets, label }: Props): JSX.Element {
  return (
    <Group mt="xs" gap="xs">
      {meets ? (
        <IconCircleCheck
          size={20}
          className={meets ? classes['color-validated'] : classes.color}
        />
      ) : (
        <IconCircleX
          size={20}
          className={meets ? classes['color-validated'] : classes.color}
        />
      )}

      <Text
        size="sm"
        className={meets ? classes['color-validated'] : classes.color}
      >
        {label}
      </Text>
    </Group>
  )
}
