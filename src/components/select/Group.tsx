import * as React from 'react'
import { FunctionComponent } from 'react'
import './GroupStyles.scss'

export interface GroupI {
  label: string,
  className?: string
}

export const Group: FunctionComponent<GroupI> = (props) => {
  return (
    <div className='group'>
      <div className='groupLabel'>{props.label}</div>
      <div className='groupList'>{props.children}</div>
    </div>
  )
}
