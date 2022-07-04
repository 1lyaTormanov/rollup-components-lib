import * as React from 'react'
import { FunctionComponent } from 'react'
import { wrapEvt } from '../../functions/utils'
import { ReactComponent as ShowPasswordIcon } from '../../svg/disabledPass.svg'
import { ReactComponent as HidePasswordIcon } from '../../svg/activePass.svg'
import { Tooltip, Input } from 'antd'
import './InputStyles.scss'

export interface InputI extends Omit<Partial<HTMLInputElement>, 'onchange'> {
  onChange: (value: string) => void
  name: string
  type: 'email' | 'text'
  value?: string
  placeholder?: string
  className?: string
  errorStyles?: Record<string, string>
}
export const TextInput: FunctionComponent<InputI> = (props) => {
  const { onChange, type, placeholder, name, errorStyles, className, value } = props

  return (
    <Input
      className={`default_input ${className}`}
      name={name}
      type={type}
      value={value}
      style={errorStyles}
      placeholder={placeholder}
      onChange={(event) => wrapEvt(event, onChange)}
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
    errorStyles,
    className
  } = props
  return (
    <div>
      <Input
        className={`default_input ${className}`}
        style={errorStyles}
        name={name}
        value={value}
        type={showPass ? 'text' : 'password'}
        onChange={(event) => wrapEvt(event, onChange)}
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
