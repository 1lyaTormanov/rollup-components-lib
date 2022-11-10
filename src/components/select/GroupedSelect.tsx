import * as React from 'react'
import { ReactComponent as ChevronBottom } from '../../svg/chevron-bottom.svg'
import { ReactComponent as ChevronTop } from '../../svg/chevron-top.svg'
import './SelectStyles.scss'
import { FocusWrapper } from '../wrappers/FocusWrapper'
import { SelectI } from './Select'
import { Group } from './Group'
import {Divider} from "antd";

export interface GroupedSelect<T> extends Omit<SelectI<T>, 'list'> {
  list: [string, T[]][]
}

export function GroupedSelect<V>(props: GroupedSelect<V>): JSX.Element {
  const {
    value,
    onChangeValue,
    render,
    list,
    className,
    defaultValue,
    disabledItem,
    disabled,
    uniqueElement,
    needHeader,
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
            <div className='selectList'>
              {needHeader && (
                <React.Fragment>
                  <div
                    className='selectList__newList'
                    onClick={() => {
                      onHeaderClick?.()
                      setClose?.()
                    }}
                  >
                    {renderHeaderContent}
                  </div>
                  <Divider />
                </React.Fragment>
              )}
              <div className='select_list_wrapper'>
                {list.map(([name, generic], index) => {
                  return (
                    <Group label={name} key={index}>
                      {generic.map((i, index) => (
                        <div
                          className={`selectListItem  ${
                            uniqueElement(i) && 'active'
                          } ${disabledItem?.(i) && 'disabled'}`}
                          onClick={() => {
                            onChangeValue?.(i)
                            setClose?.()
                          }}
                          key={index}
                        >
                          {render(i)}
                        </div>
                      ))}
                    </Group>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </FocusWrapper>
  )
}
