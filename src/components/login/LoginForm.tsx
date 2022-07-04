import * as React from 'react'
import {ChangeEvent} from 'react'
import './FormStyles.scss'
import { useTranslation } from 'react-i18next'
import { Col } from 'antd'
import { Formik, FormikErrors, FormikTouched } from 'formik'
import { Form } from 'formik-antd'

export type SliderChildren<T> = {
  values: T
  errors: FormikErrors<T>
  handleChange: (e: ChangeEvent<any>) => void
  touched: FormikTouched<T>
  isValid: boolean
  setTouched: (touched: FormikTouched<T>, shouldValidate?: boolean) => void
}

export interface LoginFormI<T> {
  appName: string
  logo: string
  setToken?: (value: string) => void
  token?: string
  errorStyle?: React.CSSProperties
  initialValues: T
  onSubmit: () => void
  children: (children: SliderChildren<T>) => React.ReactNode
  validationSchema: any
}

export function FormWrapper<T>(props: LoginFormI<T>) {
  const { t } = useTranslation()
  return (
    <Col span={12} className='login-form'>
      <div className='container'>
        <img
          src={props.logo}
          className='login-form-logo'
          alt='login-form-logo'
        />
        <Formik<T>
          validateOnBlur
          validateOnChange
          validationSchema={props.validationSchema}
          initialValues={props.initialValues}
          onSubmit={props.onSubmit}
        >
          {({ values, errors, handleChange, touched, isValid, setTouched }) => (
            <Form
              className='login-form'
              onKeyDown={(e) => e.key === 'Enter' && props.onSubmit()}
            >
              <div className='login-form__container'>
                <h1>{props.appName}</h1>
                <span id='invalid' style={props.errorStyle}>
                  {`${t('invalidMsg')}`}
                </span>
                {props.children({
                  values,
                  errors,
                  handleChange,
                  touched,
                  isValid,
                  setTouched
                })}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Col>
  )
}
