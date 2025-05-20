import {
  CheckIcon,
  Combobox,
  Group,
  InputBase,
  Text,
  useCombobox,
} from '@mantine/core'
import { CSSProperties, type JSX, useMemo, useState } from 'react'
import { FixedSizeList as List } from 'react-window'

type Props = {
  data: string[]
  defaultValue?: string
  value?: string
  limit?: number
  onChange: (value: string) => void
  [key: string]: unknown
}

export function SearchableSelect({
  data,
  defaultValue,
  limit,
  onChange,
  value,
  ...props
}: Props): JSX.Element {
  const [selectedValue, setSelectedValue] = useState<string | null>(
    (defaultValue || value) ?? null,
  )
  const [search, setSearch] = useState((defaultValue || value) ?? '')

  const filteredOptions = useMemo(() => {
    if (!search) return limit ? data.slice(0, limit) : data

    return data.filter(item =>
      item.toLowerCase().includes(search.toLowerCase().trim()),
    )
  }, [data, limit, search])

  const itemSize = 34

  const listHeight = Math.min(6, filteredOptions.length) * itemSize

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: eventSource => {
      setSearch('')

      if (eventSource === 'keyboard') {
        combobox.selectActiveOption()
      } else {
        combobox.updateSelectedOptionIndex('active')
      }
    },
  })

  return (
    <Combobox
      store={combobox}
      withinPortal={false}
      onOptionSubmit={val => {
        setSelectedValue(val)

        setSearch(val)

        onChange(val)

        combobox.updateSelectedOptionIndex('active')

        combobox.closeDropdown()
      }}
    >
      <Combobox.Target>
        <InputBase
          {...props}
          rightSection={<Combobox.Chevron />}
          value={search}
          onChange={event => {
            setSearch(event.currentTarget.value)

            combobox.openDropdown()

            combobox.updateSelectedOptionIndex()
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => {
            setSearch(selectedValue || '')

            combobox.closeDropdown()
          }}
          rightSectionPointerEvents="none"
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        {filteredOptions.length === 0 ? (
          <Combobox.Empty>Nothing found</Combobox.Empty>
        ) : (
          <List
            height={listHeight}
            itemCount={filteredOptions.length}
            itemSize={itemSize}
            width="100%"
          >
            {({ index, style }: { index: number; style: CSSProperties }) => {
              const item = filteredOptions[index]
              const isActive = item === selectedValue

              return (
                <div key={item} style={style}>
                  <Combobox.Option
                    key={item}
                    value={item}
                    active={item === selectedValue}
                  >
                    <Group gap="xs">
                      {isActive && <CheckIcon size={12} color="gray" />}

                      <Text size="sm">{item}</Text>
                    </Group>
                  </Combobox.Option>
                </div>
              )
            }}
          </List>
        )}
      </Combobox.Dropdown>
    </Combobox>
  )
}
