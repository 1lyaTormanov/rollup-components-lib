import React, { FunctionComponent } from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'
import './PickerStyles.scss'
import { RangeValue } from 'rc-picker/lib/interface'
import { RangePickerProps } from 'formik-antd/src/date-picker'


export interface OverloadPickerProps
  extends Omit<Partial<RangePickerProps>, 'onchange'> {
  onChange: (value: RangeValue<moment.Moment>) => void
}

const { RangePicker } = DatePicker

export const CustomRangePicker: FunctionComponent<OverloadPickerProps> = (
  props
) => {
  return <RangePicker {...props} />
}
