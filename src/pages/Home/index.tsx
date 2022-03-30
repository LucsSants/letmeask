import {useHistory} from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'

import illustrationImg from '../../assets/images/illustration.svg'
import logoImg from '../../assets/images/logo.svg'
import googleIconImg from '../../assets/images/google-icon.svg'

import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../../services/firebase'
import {PageAuth} from './styles'
import { useTheme } from '../../hooks/useTheme'
<<<<<<< HEAD
import { ThemeSwitch } from '../../components/ThemeSwitch'
=======
>>>>>>> 3316603be62ac54fb8d6180ecff58a3fecb3e45c

export function Home() {
  const history = useHistory();
  const {signInWithGoogle, user} = useAuth();

  const [roomCode,setRoomCode] = useState('')

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
  
  async function handleCreateRom() {
    if (!user) {
      await signInWithGoogle()
    }
    
    history.push('/rooms/new')
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault()

    if (roomCode.trim() === ''){
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    
    if (!roomRef.exists()) {
      toast.error('Room does not exists!', {style: toastStyle()})

      return;
    }

    if(roomRef.val().endedAt) {
      toast.error('Room already closed!')
      return;
    }

    history.push(`rooms/${roomCode}`)
  }

return(

    <PageAuth>

      <aside>
        <img src={illustrationImg} alt="Ilustração perguntass e respostas" />
        <strong>Crie suas salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
        <Toaster />

      </aside>

      <main>
        <div className="main-content">
<<<<<<< HEAD
          <div className='theme-switch'>
            <ThemeSwitch/>
          </div>
=======
>>>>>>> 3316603be62ac54fb8d6180ecff58a3fecb3e45c
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRom} className="create-room">
            <img src={googleIconImg} alt="Logo do google" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}> 
            <input 
            type="text"
            placeholder='Digite o código da sala' 
            onChange={event=> setRoomCode(event.target.value)}
            value = {roomCode}
            />

            <Button type='submit' >
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>

    </PageAuth>
)
}