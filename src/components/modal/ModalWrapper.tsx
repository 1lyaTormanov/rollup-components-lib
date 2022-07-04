import * as React from 'react'
import { FunctionComponent } from 'react'
import { Modal } from 'antd'
import './ModalStyles.scss'
import { ReactComponent as CloseIcon } from '../../svg/closeIcon.svg'

export interface ModalWrapperI {
  visible: boolean
  footer: React.ReactNode[] | false
  title?: React.ReactNode | string
  onCancel: () => void
  className?: string
}

export const ModalWrapper: FunctionComponent<ModalWrapperI> = (props) => {
  const { visible, footer, title, onCancel, className } = props
  return (
    <Modal
      className={`modal_wrapper ${className}`}
      visible={visible}
      footer={footer}
      title={title}
      closeIcon={<CloseIcon />}
      onCancel={onCancel}
    >
      {props.children}
    </Modal>
  )
}
