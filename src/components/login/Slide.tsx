import * as React from 'react'
import { DefaultSlide } from '../../types/types'

interface Props {
  element: DefaultSlide
}

export function Slide(props: Props) {
  const { element } = props
  return (
    <div>
      <img src={element.src} alt={element.alt} className='dashboard-img' />
      <h2 className='dashboard-header'>{element.header}</h2>
      <div className='dashboard-subheader'>{element.subheader} </div>
    </div>
  )
}
