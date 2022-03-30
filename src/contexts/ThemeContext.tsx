import { createContext, ReactNode} from "react";
import light from '../styles/themes/light';
import dark from '../styles/themes/dark';
import {DefaultTheme} from 'styled-components'

import usePeristedState from '../hooks/usePersitedState'



type ThemeContextType = {
  theme:DefaultTheme;
  toggleTheme: () => void;
}

type ThemeContextProviderType = {
  children: ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextType)

export function ThemeContextProvider(props: ThemeContextProviderType) {
  const [theme, setTheme] = usePeristedState('theme',light)

  const toggleTheme = () => {
    setTheme(theme.title === 'light' ? dark : light)
  }

  return(
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {props.children}
      </ThemeContext.Provider>

  ) 
}

