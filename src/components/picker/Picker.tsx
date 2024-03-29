import * as React from 'react'
import { FunctionComponent } from 'react'
import moment from 'moment'
import { DatePicker } from 'antd'
import './PickerStyles.scss'
import {ReactComponent as ClearIcon} from '../../svg/clear.svg'

interface PickerI {
  picker: 'week' | 'month' | 'quarter' | 'year'
  onChange: (data: any) => void
  format: string
  value: string
  styleClass?: string
  disabledDate?: (current: moment.Moment) => boolean
}

export const Picker: FunctionComponent<PickerI> = (props) => {
  return (
    <DatePicker
      disabledDate={props.disabledDate}
      picker={props.picker}
      clearIcon={<ClearIcon/>}
      className={props.styleClass || 'customPicker'}
      onChange={(date) => props.onChange(date)}
      format={props.format}
      value={moment(props.value)}
    />
  )
}
