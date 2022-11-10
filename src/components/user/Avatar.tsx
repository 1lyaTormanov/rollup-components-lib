import * as React from 'react'
import { FunctionComponent } from 'react'
import './AvatarStyles.scss'
import { ReactComponent as EmptyUser } from '../../svg/userpic-empty.svg'
export interface AvatarI {
  className?: string
  url?: string | null
}

export const Avatar: FunctionComponent<AvatarI> = (props) => {
  return (
    <div className={`avatar_wrapper ${props.className}`}>
      {props.url ? (
        <img className='avatar' alt='user' src={props.url} />
      ) : (
        <EmptyUser className='empty' />
      )}
    </div>
  )
}
