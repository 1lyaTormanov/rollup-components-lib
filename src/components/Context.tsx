import * as React from 'react'

export type Themes =
  | 'blue'
  | 'green'
  | 'orange'
  | 'red'
  | 'neutral'
  | 'cyan'
  | 'indigo'
  | 'purple'
  | 'magenta'

export const LM_COLOR = 'green'
export const WORKLOAD_TRACKING = 'cyan'


export type ThemeContextType = {
  theme: Themes
  toggleTheme?: (value: Themes) => void
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: LM_COLOR,
  toggleTheme(value: Themes) {
    this.theme = value
  }
})
