import * as React from 'react'
import './NotificationStyles.scss'
import { useTranslation } from 'react-i18next'
import { ReactNode } from 'react'

interface PropsI<T> {
  messages: T[]
  deleteNotifications: (ids: number[]) => void
  renderList: (elem: T, closeCn: () => void) => ReactNode
  messagesToId: (item: T[]) => number[]
  onClose: () => void
}

export function Notifications<T>(props: PropsI<T>) {
  const { t } = useTranslation()
  const height = props.messages.length > 4 ? '350px' : 'max-content'
  return (
    <div className='notifications_list'>
      <div className='title'>
        <span className='title_left'>
          {t('notifications')} ({props.messages?.length})
        </span>
        <span
          className='title_right'
          onClick={() =>
            props.deleteNotifications?.(props.messagesToId?.(props.messages))
          }
        >
          {t('notifications_mask')}
        </span>
      </div>
      <div className='list' style={{ height: height }}>
        {props.messages.map((item, index) => (
          <div className='notification_wrapper' key={index}>
            {props.renderList(item, props.onClose)}
          </div>
        ))}
      </div>
    </div>
  )
}
