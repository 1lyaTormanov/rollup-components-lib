import * as React from 'react'
import {FunctionComponent} from 'react'
import { Input } from 'antd'
import { wrapEvt } from '../../functions/utils'
import { InputI } from './Input'
import './InputStyles.scss'

export interface SearchInputI
  extends Pick<InputI, 'onChange' | 'placeholder' | 'className'> {
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  value: string
  disabled?: boolean
  allowClear: true
}

export const SearchInput: FunctionComponent<SearchInputI> = (props) => {
  const {
    onChange,
    placeholder,
    className,
    prefix,
    allowClear,
    suffix,
    value,
    disabled
  } = props
  return (
    <Input
      disabled={disabled}
      allowClear={allowClear}
      value={value}
      className={`default_input ${className}`}
      placeholder={placeholder}
      prefix={prefix}
      suffix={value.length ? null : suffix}
      onChange={(e) => wrapEvt(e, onChange)}
    />
  )
}
