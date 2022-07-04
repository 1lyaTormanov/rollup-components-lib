
import * as React from 'react'
import {ReactNode} from "react";

export interface DefaultSlide {
  src: string
  alt: string
  header: string
  subheader: string
}
export type PickByValue<T, ValueType> = Pick<
  T,
  { [Key in keyof T]-?: T[Key] extends ValueType ? Key : never }[keyof T]
>

export type UnionSlider<T> = {
  variant:
    | {
        type: 'DEFAULT'
        item: DefaultSlide
      }
    | {
        type: 'CUSTOM'
        item: T
      }
}

export interface UserDataI {
  absent: boolean
  acted: never[]
  acting: never[]
  birthday: string
  email: string
  firstname: string
  firstnameNational: string
  head: { name: string; id: number }
  hierarchyId: number
  hierarchyName: string
  hierarchyPathShort: string[]
  id: number
  lastname: string
  lastnameNational: string
  location: string
  login: string
  middlename: string
  middlenameNational: string
  name: string
  personalNumber: string
  phoneNumber: string
  portraitUrl: string
  positionId: number
  positionName: string
  staffLineId: number
}

export interface NavHeaderItem {
  icon: React.ReactSVG | string | ReactNode
  title: string
  link: string
  onClick?: () => void
  className?: string
  id: number
}

export type SlideI<T> = DefaultSlide[] | T[]
