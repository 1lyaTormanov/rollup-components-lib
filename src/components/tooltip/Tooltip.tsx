import * as React from 'react'
import {CSSProperties, FunctionComponent} from 'react'
import { TooltipPlacement } from 'antd/lib/tooltip'
import { Tooltip } from 'antd'
import './TooltipStyle.scss'

interface Props {
  placement?: TooltipPlacement
  color?: string
  title: string | React.ReactNode
  style?: CSSProperties
  className?: string
}

export const TooltipWrapper: FunctionComponent<Props> = (props) => {
  return (
    <Tooltip
      style={props.style}
      color={props.color ? props.color : '#475569'}
      overlayClassName={`tltp ${props.className}`}
      placement={props.placement}
      title={props.title}
    >
      {props.children}
    </Tooltip>
  )
}
