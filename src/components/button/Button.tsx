import * as React from 'react'
import {
  Children,
  CSSProperties,
  FunctionComponent,
  ReactNode,
  useCallback
} from 'react'
import './ButtonStyles.scss'
import clsx from 'clsx'
import { Spinner } from '../spinner/Spinner'

export interface ButtonI {
  onClick?: () => void
  disabled?: boolean
  theme: UnionThemeType
  className?: string
  type?: 'button' | 'reset' | 'submit'
  loading?: boolean
  children?: ReactNode | ReactNode[]
  style?: CSSProperties
}

type PrimaryType = {
  variant: 'primary'
  color: 'red' | 'green' | 'cyan' | 'blue'
}
type SecondaryType = {
  variant: 'secondary'
  color: 'red' | 'green' | 'cyan' | 'blue'
}
type WhiteType = { variant: 'light'; color: 'grey' | 'red' }

type UnionThemeType = PrimaryType | SecondaryType | WhiteType

export const Button: FunctionComponent<ButtonI> = (props) => {
  const {
    onClick,
    disabled,
    style,
    className,
    loading,
    type,
    theme: { color, variant }
  } = props
  const isDisabled = disabled
  const click = useCallback(() => {
    if (!isDisabled) {
      onClick?.()
    }
  }, [isDisabled, onClick])

  const isPrimary = variant === 'primary'
  const isSecondary = variant === 'secondary'
  const isLight = variant === 'light'
  const singleChildrenAmount = Children.count(props.children) === 1

  return (
    <button
      type={type || 'button'}
      style={{
        ...style,
        justifyContent: singleChildrenAmount ? 'center' : 'space-between'
      }}
      className={clsx('button', className, {
        primary_green: color === 'green' && isPrimary,
        primary_cyan: color === 'cyan' && isPrimary,
        primary_red: color === 'red' && isPrimary,
        secondary_red: color === 'red' && isSecondary,
        secondary_cyan: color === 'cyan' && isSecondary,
        secondary_green: color === 'green' && isSecondary,
        primary_blue: color === 'blue' && isPrimary,
        secondary_blue: color === 'blue' && isSecondary,
        white_grey: color === 'grey' && isLight,
        white_red: color === 'red' && isLight
      })}
      disabled={disabled}
      onClick={click}
    >
      {loading && <Spinner />}
      {Children.map(props.children, (child) =>
        typeof child === 'string' ? <div>{child}</div> : child
      )}
    </button>
  )
}
