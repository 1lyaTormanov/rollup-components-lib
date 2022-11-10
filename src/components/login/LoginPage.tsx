import * as React from 'react'
import { Col, Row } from 'antd'
import './LoginPage.scss'
import { Dashboard } from './Dashboard'
import { LoginForm } from './LoginForm'
import { DefaultSlide } from '../../types/types'

export interface LoginPageI<T> {
  autoplay: boolean
  logo: string
  slides: DefaultSlide[] | T[]
  type: 'DEFAULT' | 'CUSTOM'
  appName: string
}

export function LoginPage<T>(props: LoginPageI<T>) {
  const { autoplay, logo, slides, type, appName } = props
  return (
    <Row>
      <Col span={12} className='login-dashboard'>
        <Dashboard
          autoplay={autoplay}
          logo={logo}
          slides={slides}
          type={type}
        />
      </Col>
      <Col span={12} className='login-form'>
        <LoginForm appName={appName} logo={logo} />
      </Col>
    </Row>
  )
}
