import {
  CheckIcon,
  Combobox,
  Group,
  InputBase,
  Text,
  useCombobox,
} from '@mantine/core'
import { useTranslation } from 'next-i18next'
import { type JSX, useEffect, useMemo, useRef, useState } from 'react'
import { FixedSizeList as List } from 'react-window'

import classes from './SearchableSelect.module.css'

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
  const { t } = useTranslation()

  const listRef = useRef<List>(null)

  const [activeIndex, setActiveIndex] = useState(0)

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
    onDropdownOpen: () => {
      setSearch('')
      setActiveIndex(0)

      listRef.current?.scrollToItem(0)
    },
  })

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollToItem(activeIndex)
    }
  }, [activeIndex])

  useEffect(() => {
    setSelectedValue(value || '')

    setSearch(value || '')
  }, [value])

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
          onKeyDown={event => {
            if (event.code === 'ArrowDown') {
              setActiveIndex(prev => {
                const next = Math.min(prev + 1, filteredOptions.length - 1)
                return next
              })
            }

            if (event.code === 'ArrowUp') {
              setActiveIndex(prev => {
                const next = Math.max(prev - 1, 0)
                return next
              })
            }

            if (event.code === 'Enter') {
              const filteredValue = filteredOptions[activeIndex]

              setSelectedValue(filteredValue)

              setSearch(filteredValue)

              onChange(filteredValue)

              combobox.closeDropdown()
            }
          }}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        {filteredOptions.length === 0 ? (
          <Combobox.Empty>{t('table.select.nothingFound')}</Combobox.Empty>
        ) : (
          <List
            ref={listRef}
            height={listHeight}
            itemCount={filteredOptions.length}
            itemSize={itemSize}
            width="100%"
          >
            {({ index, style }) => {
              const item = filteredOptions[index]

              const isActive = index === activeIndex

              const isSelected = item === selectedValue

              return (
                <div key={item} style={style}>
                  <Combobox.Option
                    value={item}
                    className={isActive ? classes.options : ''}
                    active={isActive}
                  >
                    <Group gap="xs">
                      {isSelected && <CheckIcon size={12} color="gray" />}
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
