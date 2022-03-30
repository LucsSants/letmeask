import copyImg from '../../assets/images/copy.svg'
import {ButtonContainer} from './style'
import toast from 'react-hot-toast'
import { useTheme } from '../../hooks/useTheme';



type RandomCodeProps = {
  code: string;
}

export function Roomcode(props: RandomCodeProps) {
  const {theme} = useTheme();

  function toastStyle() {
    if (theme.title === 'dark')  {
      return {
        background: '#0c0c0d',
        color: '#f8f8f8'
      } 
    } else {
      return {
        background: '#f8f8f8',
        color: '#0c0c0d'
      }
    }
  }
  
  function copyRoomCodeToClipboard() {

    navigator.clipboard.writeText(props.code)
    toast('Copiado!', {
      icon: '📑',
      style: toastStyle()

    })
    
  }
  
  return( 
    <ButtonContainer className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code"/>
        
      </div>  
      <span>Sala #{props.code}</span>
    </ButtonContainer>
  )
}