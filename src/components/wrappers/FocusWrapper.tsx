import * as React from 'react'
import {
  CSSProperties,
  FunctionComponent,
  ReactNode,
  useRef,
  useState
} from 'react'
import { useClickAway } from 'react-use'

interface FocusWrapperI {
  className?: string
  children: (
    value?: boolean,
    closeCallback?: () => void,
    openCallback?: () => void
  ) => ReactNode
  style?: CSSProperties
}

export const FocusWrapper: FunctionComponent<FocusWrapperI> = (props) => {
  const [state, setState] = useState(false)
  const ref = useRef(null)

  useClickAway(ref, () => {
    setState(false)
  })
  return (
    <div className={props.className} style={props.style} ref={ref} tabIndex={1}>
      {props.children(
        state,
        () => setState(false),
        () => setState(!state)
      )}
    </div>
  )
}
