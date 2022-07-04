import * as React from 'react'
import { ReactNode } from 'react'
import { ReactComponent as NotificationIcon } from '../../svg/notifications.svg'
import { ReactComponent as ChevronTop } from '../../svg/chevron-top.svg'
import { ReactComponent as ChevronBottom } from '../../svg/chevron-bottom.svg'
import { ReactComponent as ActiveSupportIcon } from '../../svg/activeSupportIcon.svg'
import { ReactComponent as SupportIcon } from '../../svg/supportIcon.svg'
import { Menu, Dropdown } from 'antd'
import { Avatar } from '../avatar/Avatar'
import './HeaderStyles.scss'
import { useWindowSize } from 'react-use'
import { NavItem } from './NavItem'
import { NavHeaderItem } from '../../types/types'
import { FocusWrapper } from '../wrappers/FocusWrapper'
import { DropdownMenu } from '../select/DropdownMenu'
import { Notifications } from './Notifications'
import { useTranslation } from 'react-i18next'
import { BREAKPOINT_LG } from '../consts'

export interface DropdownItemsI {
  title: string
  icon: ReactNode
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
  urls: NavHeaderItem[]
  currentItem?: NavHeaderItem
  setCurrentMenuItem?: (value: NavHeaderItem) => void
  isHelpBlock?: true
  onChangeRoute: (item: string) => void
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
    onChangeRoute,
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
  const getActiveClass = (elem: NavHeaderItem) =>
    currentItem?.link === elem.link ? `activeClass ${elem.className}` : ''

  const handler = (element: NavHeaderItem) => {
    setCurrentMenuItem?.(element)
    onChangeRoute?.(element.link)
  }
  return (
    <div className={`header-wrapper ${className}`}>
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
              {urls.map((item) => (
                <NavItem
                  key={item.id}
                  icon={item.icon}
                  id={item.id}
                  onClick={() => handler(item)}
                  link={item.link}
                  title={item.title}
                  className={getActiveClass(item)}
                />
              ))}
            </React.Fragment>
          ) : (
            <FocusWrapper>
              {(openMobileMenu, closeMenu, openMenu) => (
                <React.Fragment>
                  <div className='mobileItem'>
                    {currentItem && (
                      <NavItem
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
                        itemToKey={(item) => item.id.toString()}
                        uniqueKey={{ key: 'id', value: currentItem.id }}
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
            <FocusWrapper className='helpWrapper'>
              {(isHelp, closeCallback, openCallback) => (
                <React.Fragment>
                  {isHelp ? (
                    <ActiveSupportIcon onClick={closeCallback} />
                  ) : (
                    <SupportIcon onClick={openCallback} />
                  )}
                  <React.Fragment>
                    {isHelp && (
                      <React.Fragment>
                        {!renderHelpPopUp ? (
                          <div className='helpAbsolute'>
                            <div className='help_title'>{t('help_title')}</div>
                            <div className='help_content'>
                              {t('help_content')}
                            </div>
                            <div className='help_footer'>
                              {t('help_contacts')} :{' '}
                              <a href='mailto:y.ilkavets@ibagroup.eu'>
                                y.ilkavets@ibagroup.eu
                              </a>
                            </div>
                          </div>
                        ) : (
                          <div className='helpAbsolute'>
                            {renderHelpPopUp?.(closeCallback)}
                          </div>
                        )}
                      </React.Fragment>
                    )}
                  </React.Fragment>
                </React.Fragment>
              )}
            </FocusWrapper>
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
              <Avatar url={user.avatar} className='ant-dropdown-avatar' />
              <div className='dropdown-info'>
                <div className='dropdown-name'>{user.name}</div>
                <div
                  className={`dropdown-job ${
                    user.positionName.length > 25 && 'dropdown-job-ellipsis'
                  }`}
                >
                  {user.positionName}
                </div>
              </div>
              <ChevronBottom />
            </nav>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
