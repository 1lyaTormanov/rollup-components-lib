import * as React from 'react'
import {FunctionComponent, useState} from 'react'
import { wrapEvt } from '../../functions/utils'
import { InputI } from './Input'
import './InputStyles.scss'
import {ReactComponent as ClearIcon} from '../../svg/clear.svg'
import {FocusWrapper} from "../wrappers/FocusWrapper";

export interface SearchInputI
  extends Pick<InputI,  'placeholder' | 'className'> {
  prefix?: React.ReactNode
  onChange: (value: string) => void
  value: string
  disabled?: boolean
  allowClear?: true
}

export const SearchInput: FunctionComponent<SearchInputI> = (props) => {
  const {
    onChange,
    placeholder,
    className,
    prefix,
    allowClear,
    value,
    disabled
  } = props


  return (
    <FocusWrapper className={'input_focus_wrapper'}>
        {(focus, _, openCallback)=>
            <span onClick={()=> openCallback?.()} className={`input_wrapper ${className} ${focus ? 'focused_element': ''}`}>
                  <span className={'icon_prefix'}>{prefix && <>{prefix}</>}</span>
                  <input
                      disabled={disabled}
                      value={value}
                      placeholder={placeholder}
                      // prefix={prefix}
                      // suffix={value.length ? null : suffix}
                      onChange={(e) => wrapEvt(e, onChange)}
                  />
                  <span className={'icon_clear'}>
                      {allowClear && !!value.length &&
                          <ClearIcon onClick={()=> onChange('')}/>
                      }
                  </span>

    </span>
        }
    </FocusWrapper>
  )
}
