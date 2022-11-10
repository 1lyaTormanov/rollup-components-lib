import * as React from 'react'
import { ReactNode, useRef, useState } from 'react'
import { ReactComponent as NotificationIcon } from '../../svg/notifications.svg'
import { ReactComponent as ChevronTop } from '../../svg/chevron-top.svg'
import { ReactComponent as ChevronBottom } from '../../svg/chevron-bottom.svg'
import { ReactComponent as ActiveSupportIcon } from '../../svg/activeSupportIcon.svg'
import { ReactComponent as SupportIcon } from '../../svg/supportIcon.svg'
import { Menu, Dropdown } from 'antd'
import './HeaderStyles.scss'
import { useClickAway, useWindowSize } from 'react-use'
import { NavItem } from './NavItem'
import { NavHeaderItem } from '../../types/types'
import { FocusWrapper } from '../wrappers/FocusWrapper'
import { DropdownMenu } from '../select/DropdownMenu'
import { Notifications } from './Notifications'
import { useTranslation } from 'react-i18next'
import { BREAKPOINT_LG } from '../consts'
import { UserPreview } from '../user/UserPreview'

export interface DropdownItemsI {
  title: string
  icon: any
  link: string
  disabled: boolean
  onClick?: () => void
}

interface User {
  avatar: string
  name: string
  positionName: string
}

export interface HeaderI<M> {
  logo: string
  dropdownItems: DropdownItemsI[]
  user: User
  urls: Omit<NavHeaderItem, 'renderLink'>[]
  currentItem?: Omit<NavHeaderItem, 'renderLink'>
  setCurrentMenuItem?: (value: Omit<NavHeaderItem, 'renderLink'>) => void
  isHelpBlock?: true
  renderLink: (route: string) => JSX.Element
  messages: M[]
  renderList: (item: M, closeCl: () => void) => ReactNode
  deleteNotifications: (ids: number[]) => void
  onLogoClick?: () => void
  messagesToId: (list: M[]) => number[]
  className?: string
  renderHelpPopUp?: (onClose?: () => void) => React.ReactNode
}

export function HeaderLayout<T>(props: HeaderI<T>) {
  const {
    logo,
    dropdownItems,
    user,
    urls,
    currentItem,
    setCurrentMenuItem,
    isHelpBlock,
    renderLink,
    messages,
    renderList,
    deleteNotifications,
    messagesToId,
    onLogoClick,
    className,
    renderHelpPopUp
  } = props
  const { width } = useWindowSize()
  const { t } = useTranslation()
  const isTablet = width <= BREAKPOINT_LG
  const getActiveClass = (elem: Omit<NavHeaderItem, 'renderLink'>) =>
    currentItem?.link === elem.link ? `activeClass ${elem.className}` : ''

  const [openHelp, setOpenHelp] = useState(false)

  const handler = (element: Omit<NavHeaderItem, 'renderLink'>) => {
    setCurrentMenuItem?.(element)
  }

  const helpRef = useRef<HTMLDivElement | null>(null)

  useClickAway(helpRef, () => {
    setOpenHelp(false)
  })
  return (
    <div className={`header-wrapper ${className}`}>
      <React.Fragment>
        {openHelp && (
          <React.Fragment>
            {!renderHelpPopUp ? (
              <div className='helpAbsolute' ref={helpRef}>
                <div className='help_title'>{t('help_title')}</div>
                <div className='help_content'>{t('help_content')}</div>
                <div className='help_footer'>
                  {t('help_contacts')}
                  <a href='mailto:y.ilkavets@ibagroup.eu'>
                    y.ilkavets@ibagroup.eu
                  </a>
                </div>
              </div>
            ) : (
              <div className='helpAbsolute' ref={helpRef}>
                {renderHelpPopUp?.(() => setOpenHelp(false))}
              </div>
            )}
          </React.Fragment>
        )}
      </React.Fragment>
      <div className='header'>
        <img
          style={{ cursor: onLogoClick ? 'pointer' : 'default' }}
          src={logo}
          className='header__logo'
          alt='logotype'
          onClick={onLogoClick}
        />
        <div className='header__nav'>
          {!isTablet ? (
            <React.Fragment>
              {urls.map((item) => {
                return (
                  <NavItem
                    key={item.id}
                    icon={item.icon}
                    id={item.id}
                    onClick={() => handler(item)}
                    link={item.link}
                    renderLink={renderLink}
                    title={item.title}
                    className={getActiveClass(item)}
                  />
                )
              })}
            </React.Fragment>
          ) : (
            <FocusWrapper>
              {(openMobileMenu, closeMenu, openMenu) => (
                <React.Fragment>
                  <div className='mobileItem'>
                    {currentItem && (
                      <NavItem
                        renderLink={renderLink}
                        key={currentItem.id}
                        icon={currentItem.icon}
                        id={currentItem.id}
                        onClick={() => openMenu?.()}
                        link={currentItem.link}
                        title={currentItem.title}
                        className={getActiveClass(currentItem)}
                      />
                    )}
                    <div className='currentItemChevronIcon'>
                      {openMobileMenu ? <ChevronTop /> : <ChevronBottom />}
                    </div>
                  </div>
                  {openMobileMenu && currentItem && (
                    <div className='navBarMobile'>
                      <DropdownMenu
                        value={currentItem.title}
                        list={urls}
                        disabled={(i) => !i.link}
                        render={(item) => (
                          <div
                            className={`linkMobile  ${
                              currentItem?.id === item.id && 'activeLinkMobile'
                            }`}
                            key={item.id}
                            onClick={() => {
                              handler(item)
                            }}
                          >
                            {item?.icon}
                            <div>{item?.title}</div>
                          </div>
                        )}
                        toggleState={closeMenu}
                        uniqueElement={(el) => el.id === currentItem?.id}
                      />
                    </div>
                  )}
                </React.Fragment>
              )}
            </FocusWrapper>
          )}
        </div>
        <div className='rightBlock'>
          {isHelpBlock && (
            <React.Fragment>
              {openHelp ? (
                <ActiveSupportIcon />
              ) : (
                <SupportIcon
                  onClick={() => {
                    setOpenHelp(!openHelp)
                  }}
                />
              )}
            </React.Fragment>
          )}
          <FocusWrapper className='notifWrapper'>
            {(isNotif, closeCallback, openNotif) => (
              <React.Fragment>
                {messages.length > 0 && <span className='notifCircle' />}
                <NotificationIcon
                  className={`notification-icon ${
                    isNotif && 'active-notification-icon'
                  }`}
                  onClick={openNotif}
                />
                {isNotif && closeCallback && (
                  <div className='notificationsListAbsolute'>
                    <Notifications
                      onClose={closeCallback}
                      messages={messages}
                      renderList={renderList}
                      deleteNotifications={deleteNotifications}
                      messagesToId={messagesToId}
                    />
                  </div>
                )}
              </React.Fragment>
            )}
          </FocusWrapper>
          <Dropdown
            overlayClassName='dropdown_header'
            trigger={['click']}
            overlay={
              <Menu>
                {dropdownItems.map((i) => (
                  <Menu.Item
                    disabled={i.disabled}
                    icon={i.icon}
                    key={i.title}
                    onClick={i.onClick}
                  >
                    <nav>{i.title}</nav>
                  </Menu.Item>
                ))}
              </Menu>
            }
          >
            <nav
              className='ant-dropdown-link'
              onClick={(e) => e.preventDefault()}
            >
              <UserPreview
                url={user.avatar}
                username={user.name}
                description={user.positionName}
              />
              <ChevronBottom className='nav_panel' />
            </nav>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
