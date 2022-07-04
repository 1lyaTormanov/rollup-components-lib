import { Select } from 'antd';
import {  SelectProps } from 'antd/lib/select';
import * as React from 'react';
import './AntdSelect.scss';

export interface Props<ValueType, OptionType> extends SelectProps<ValueType, OptionType>{
  customClassName?: string
}


export function AntdSelect<ValueType, OptionType>(props: Props<ValueType, OptionType>){
  return (
    <div className="antd-overload-select">
      <Select
        {...props}
        bordered={false}
        className={`antd-custom-kit-select ${props.customClassName}`}
      >
        {props.children}
      </Select>
    </div>
  );
}
