import * as React from 'react'
import {FunctionComponent, ReactNode} from 'react'
import './BadgeStyles.scss'
import { Badge } from 'antd'

export interface BadgeProps {
  color: string
  offset?: [string | number, string | number],
  text?: string | ReactNode
}

export const CircleBadge: FunctionComponent<BadgeProps> = (props) => {
  return (
    <Badge dot color={props.color} offset={props.offset} text={props.text}>
      {props.children}
    </Badge>
  )
}
