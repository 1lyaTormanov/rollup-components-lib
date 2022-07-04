import * as React from 'react'
import { Carousel, Col } from 'antd'
import { DefaultSlide } from '../../types/types'
import { Slide } from './Slide'
import './Dashboard.scss'

export interface DashboardI {
  autoplay: boolean
  logo: string
  slides: DefaultSlide[]
}

export function Dashboard(props: DashboardI) {
  const { autoplay, logo, slides } = props
  return (
    <Col span={12} className='login-dashboard'>
      <div className='dashboard-wrapper'>
        <img src={logo} className='login-logo' alt='login-logo' />
        <Carousel autoplay={autoplay}>
          {slides.map((item, index) => (
            <Slide element={item} key={index} />
          ))}
        </Carousel>
      </div>
    </Col>
  )
}
