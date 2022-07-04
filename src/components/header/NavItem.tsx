import * as React from 'react'
import { FunctionComponent } from 'react'
import { NavHeaderItem } from '../../types/types'
import './NavItem.scss'

export const NavItem: FunctionComponent<NavHeaderItem> = (props) => {
  const { icon, title, onClick, className } = props
  return (
    <div onClick={onClick} className={`${className} nav_item`}>
      {icon}
      <h3>{title}</h3>
    </div>
  )
}
