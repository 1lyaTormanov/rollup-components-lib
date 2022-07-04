import * as React from 'react'
import { Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { FunctionComponent } from 'react'

const antIcon = <LoadingOutlined style={{ fontSize: 22 }} spin />

export const Spinner: FunctionComponent<{ className?: string }> = (props) => {
  return <Spin indicator={antIcon} className={props.className} />
}
