import * as React from 'react'
import { ReactNode } from 'react'
import './DropdownStyles.scss'
import { useTranslation } from 'react-i18next'
import { Divider } from 'antd'

export interface DropdownMenuI<T> {
  list: T[]
  value: string | number
  render: (item: T) => ReactNode
  onChangeValue?: (value: T) => void
  defaultValue?: string
  disabled?: (el: T) => boolean
  uniqueElement: (el: T) => boolean
  needHeader?: boolean
  onHeaderClick?: () => void
  renderHeaderContent?: ReactNode
  toggleState?: (value: boolean) => void
}

export function DropdownMenu<T>(props: DropdownMenuI<T>): JSX.Element {
  const {
    list,
    render,
    toggleState,
    onChangeValue,
    disabled,
    uniqueElement,
    needHeader,
    onHeaderClick,
    renderHeaderContent
  } = props

  const { t } = useTranslation()
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
        {list.map((item, index) => {
          return (
            <div
              className={`selectListItem  ${uniqueElement(item) && 'active'} ${
                disabled?.(item) && 'disabled'
              }`}
              key={index}
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
