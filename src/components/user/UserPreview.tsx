import * as React from 'react'
import { FunctionComponent } from 'react'
import { Avatar } from './Avatar'
import './UserPreview.scss'

export interface UserPreviewI {
  url?: string
  username: string
  description?: string
  classes?: { avatarClassName?: string; wrapperClassName?: string }
}

export const UserPreview: FunctionComponent<UserPreviewI> = (props) => {
  return (
    <div className={`${props.classes?.wrapperClassName} user_preview`}>
      <Avatar url={props.url} className={props.classes?.avatarClassName} />
      <div className='user_preview_data'>
        <div className='user_preview_username'>{props.username}</div>
        <div className='user_preview_position'>{props.description}</div>
      </div>
    </div>
  )
}
