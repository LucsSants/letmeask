import Switch from 'react-switch'

import {Container} from './style'

import {RiSunLine, RiMoonFill} from 'react-icons/ri'

import {useTheme} from  '../../hooks/useTheme'

export function ThemeSwitch() {

  const theme = useTheme()
  return(
    <Container>
      {theme.theme.title === 'dark' ? <RiMoonFill size={25}/> : <RiSunLine size={25}/> }
      <Switch
        onChange={theme.toggleTheme}
        checked={theme.theme.title === 'dark'}
        checkedIcon={false}
        uncheckedIcon={false}
        height={15}
        width={45}
        handleDiameter={25}
        onColor="#835afd"
        offHandleColor="#dbdcdd"
      />
    </Container>
    
  
  )

}

