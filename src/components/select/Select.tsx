import * as React from 'react'
import { ReactNode } from 'react'
import { ReactComponent as ChevronBottom } from '../../svg/chevron-bottom.svg'
import { ReactComponent as ChevronTop } from '../../svg/chevron-top.svg'
import { DropdownMenu } from './DropdownMenu'
import './SelectStyles.scss'
import { FocusWrapper } from '../wrappers/FocusWrapper'

export interface SelectI<T> {
  value: string | number
  onChangeValue: (value: T) => void
  render: (item: T) => ReactNode
  list: T[]
  className?: string
  defaultValue?: string
  disabled?: true
  itemToKey: (item: T) => string | number
  disabledItem?: (value: T) => boolean
  needHeader?: boolean
  uniqueKey?: { key: string; value: string | number }
  onHeaderClick?: () => void
  renderHeaderContent?: ReactNode
}

export function Select<V>(props: SelectI<V>): JSX.Element {
  const {
    value,
    onChangeValue,
    render,
    list,
    className,
    defaultValue,
    itemToKey,
    disabledItem,
    disabled,
    needHeader,
    uniqueKey,
    renderHeaderContent,
    onHeaderClick
  } = props

  return (
    <FocusWrapper className={className}>
      {(isOpen, setClose, setOpen) => (
        <div
          className={`selectWrapper ${isOpen && 'selectActive'} ${
            disabled && 'disabled'
          }`}
        >
          <div className='selectValue' onClick={() => !disabled && setOpen?.()}>
            <span>{value.toString().length > 0 ? value : defaultValue}</span>
            {!isOpen ? <ChevronBottom /> : <ChevronTop />}
          </div>
          {isOpen && (
            <DropdownMenu<V>
              itemToKey={itemToKey}
              defaultValue={defaultValue}
              list={list}
              value={value}
              uniqueKey={uniqueKey}
              render={render}
              toggleState={setClose}
              disabled={disabledItem}
              onChangeValue={onChangeValue}
              needHeader={needHeader}
              renderHeaderContent={renderHeaderContent}
              onHeaderClick={() => {
                onHeaderClick?.()
                setClose?.()
              }}
            />
          )}
        </div>
      )}
    </FocusWrapper>
  )
}
