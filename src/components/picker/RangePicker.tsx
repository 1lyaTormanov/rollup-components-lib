import React, { FunctionComponent } from 'react'
import {DatePicker} from 'antd'
import './PickerStyles.scss'
import { RangePickerProps } from 'formik-antd/src/date-picker'
import {ReactComponent as ClearIcon} from '../../svg/clear.svg'
const { RangePicker } = DatePicker

import 'moment/locale/en-gb';
import locale from 'antd/es/date-picker/locale/en_GB';

export const CustomRangePicker: FunctionComponent<RangePickerProps> = (
  props
) => {
  return (
        <RangePicker clearIcon={<ClearIcon/>} {...props} locale={locale}/>
  )
}
