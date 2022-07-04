import * as React from 'react'
import { FunctionComponent } from 'react'
import './ShadowLayoutStyles.scss'

export interface LayoutProps {
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

export const ShadowLayout: FunctionComponent<LayoutProps> = (props) => {
  return (
    <div className={`layout ${props.className}`}>
      {props.children}
    </div>
  )
}
