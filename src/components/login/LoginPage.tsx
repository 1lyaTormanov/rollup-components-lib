import * as React from 'react'
import { Col, Row } from 'antd'
import './LoginPage.scss'
import { Dashboard } from './Dashboard'
import {FormWrapper, SliderChildren} from './LoginForm'
import { DefaultSlide } from '../../types/types'

export interface LoginPageI<T> {
  autoplay: boolean
  logo: string
  slides: DefaultSlide[]
  appName: string
  children: (children: SliderChildren<T>) => React.ReactNode,
  initialValues: T
  onSubmit: () => void
  validationSchema: any

}

export function LoginPage<T>(props: LoginPageI<T>) {
  const { autoplay, logo, slides, appName, children, initialValues, onSubmit, validationSchema } = props
  return (
    <Row>
      <Col span={12} className='login-dashboard'>
        <Dashboard
          autoplay={autoplay}
          logo={logo}
          slides={slides}
        />
      </Col>
      <Col span={12} className='login-form'>
        <FormWrapper appName={appName} logo={logo} children={children}  initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}/>
      </Col>
    </Row>
  )
}
