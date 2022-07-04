import * as React from 'react'
import {ChangeEvent, FunctionComponent, ReactNode} from 'react'
import './Radio.scss'

interface RadioI {
  value: string,
  checkboxId: string
  checked: boolean
  onChange: (value: ChangeEvent<HTMLInputElement>) => void
  name?: string
  label: string | ReactNode
}

export const Radio: FunctionComponent<RadioI> = (props) => {
  const { value, checkboxId, checked, onChange, name, label } = props
  return (
    <div className='radioWrapper'>
      <input
        type='radio'
        value={value}
        checked={checked}
        onChange={(event) => {
          onChange(event)
        }}
        id={checkboxId}
        name={name}
        className='radio'
      />
      <label htmlFor={checkboxId}>{label}</label>
    </div>
  )
}
