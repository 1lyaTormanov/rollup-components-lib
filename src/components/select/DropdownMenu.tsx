import * as React from 'react'
import { ReactNode } from 'react'
import './DropdownStyles.scss'
import { useTranslation } from 'react-i18next'
import { Divider } from 'antd'
import { PickByValue } from '../../types/types'

function isObject<T>(item: T) {
  return typeof item === 'object'
}
export interface DropdownMenuI<T> {
  list: ReadonlyArray<T>
  value: string | number
  render: (item: T) => ReactNode
  onChangeValue?: (value: T) => void
  itemToKey: (item: T) => string | number
  defaultValue?: string
  disabled?: (el: T) => boolean
  needHeader?: boolean
  onHeaderClick?: () => void
  renderHeaderContent?: ReactNode
  uniqueKey?: { key: string; value: string | number }
  toggleState?: (value: boolean) => void
}

type KeyofGeneric<T> = T[keyof T] extends string ? keyof T : never

function filteredArr<T>(
  arr: ReadonlyArray<T>,
  key: keyof PickByValue<T, string> | undefined,
  includableValue: string | undefined,
  realValue: string | number
) {
  const result = arr.find((item) => {
    if (key && isObject(item)) {
      return (
        (item[key] as unknown as string).toString() ===
        (includableValue as unknown as string)
      )
    } else {
      return (
        (item as unknown as string).toString() ===
        (realValue.toString() as unknown as string)
      )
    }
  })

  return key ? result?.[key] : result
}

export function DropdownMenu<T>(props: DropdownMenuI<T>): JSX.Element {
  const {
    list,
    render,
    toggleState,
    onChangeValue,
    itemToKey,
    defaultValue,
    disabled,
    needHeader,
    onHeaderClick,
    uniqueKey,
    value,
    renderHeaderContent
  } = props

  const checkValue = (item: T) =>
    !itemToKey(item).toString().length ? defaultValue : itemToKey(item)

  const { t } = useTranslation()

  const getUniqueElement = filteredArr<T>(
    list,
    uniqueKey?.key as unknown as KeyofGeneric<T>,
    uniqueKey?.value.toString(),
    value
  )

  return (
    <div className='selectList'>
      {needHeader && (
        <React.Fragment>
          <div
            className='selectList__newList'
            onClick={() => {
              onHeaderClick?.()
            }}
          >
            {renderHeaderContent}
          </div>
          {list.length > 0 && (
            <React.Fragment>
              <Divider />
              <div className='selectList__myLists'>{t('myLists')}</div>
            </React.Fragment>
          )}
        </React.Fragment>
      )}
      <div className='select_list_wrapper'>
        {' '}
        {list.map((item) => {
          return (
            <div
              className={`selectListItem  ${
                checkValue(item) === getUniqueElement && 'active'
              } ${disabled?.(item) && 'disabled'}`}
              key={itemToKey(item)}
              onClick={() => {
                onChangeValue?.(item)
                toggleState?.(false)
              }}
            >
              {render(item)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
