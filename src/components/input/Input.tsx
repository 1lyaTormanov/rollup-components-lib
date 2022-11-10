import * as React from 'react'
import {ChangeEvent, FunctionComponent} from 'react'
import { ReactComponent as ShowPasswordIcon } from '../../svg/disabledPass.svg'
import { ReactComponent as HidePasswordIcon } from '../../svg/activePass.svg'
import { Tooltip } from 'antd'
import './InputStyles.scss'

export interface InputI extends Omit<Partial<HTMLInputElement>, 'onchange'> {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  name: string
  type: 'email' | 'text'
  value?: string
  placeholder?: string
  className?: string
  hasErrorStyles?: boolean
}
export const TextInput: FunctionComponent<InputI> = (props) => {
  const { onChange, type, placeholder, name, hasErrorStyles, className, value } = props

  return (
    <input
      className={`default_input ${className} form-element`}
      name={name}
      type={type}
      value={value}
      style={hasErrorStyles ? { border: '1px solid #DB2835' } : {}}
      placeholder={placeholder}
      onChange={(event) => onChange(event)}
    />
  )
}

export interface InputPassI extends Omit<InputI, 'type'> {
  showPass: boolean
  value: string
  tooltip?: {
    show: string
    hide: string
  }
  toggleType: (value: boolean) => void
}


export const InputPass: FunctionComponent<InputPassI> = (props) => {
  const {
    onChange,
    placeholder,
    name,
    showPass,
    value,
    tooltip,
    toggleType,
    hasErrorStyles,
    className
  } = props

  return (
    <div className={'input_pass_wrapper'}>
      <input
        className={`default_input ${className} form-element`}
        style={hasErrorStyles ? { border: '1px solid #DB2835' } : {}}
        name={name}
        value={value}
        type={showPass ? 'text' : 'password'}
        onChange={(event) => onChange(event)}
        placeholder={placeholder}
      />
      {value.length > 0 && (
        <React.Fragment>
          {!showPass ? (
            <Tooltip
              placement='topLeft'
              title={tooltip?.show ? tooltip.show : 'Show Password'}
            >
              <div onClick={() => toggleType(true)} className='visibilityIcon'>
                <HidePasswordIcon />
              </div>
            </Tooltip>
          ) : (
            <Tooltip
              placement='topLeft'
              title={tooltip?.hide ? tooltip.hide : 'Hide Password'}
            >
              <div onClick={() => toggleType(false)} className='visibilityIcon'>
                <ShowPasswordIcon />
              </div>
            </Tooltip>
          )}
        </React.Fragment>
      )}
    </div>
  )
}
