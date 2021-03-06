import {useParams, useHistory, Link} from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import checkImg from '../assets/images/check.svg'

import { ThemeSwitch } from '../components/ThemeSwitch'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { Roomcode } from '../components/RoomCode'
// import { useAuth } from '../hooks/useAuth'
import { useRom } from '../hooks/useRoom'
import { database } from '../services/firebase'

import {PageRoom} from '../pages/Room/styles'

import {Toaster} from 'react-hot-toast'

type RoomParams = {
  id: string
}

export function AdminRoom() {
  // const {user}= useAuth();

  const history = useHistory()
  const params = useParams<RoomParams>();
 
  const roomId = params.id;
  
  const {title, questions} = useRom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir essa pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    history.push('/');
  }

  async function  handleHighlightQuestion(questionId: string, isHighlighted: boolean | undefined) {
    if (isHighlighted) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted:false,
      })
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
        isHighlighted:true,
      })
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered :true,
    })
  }

  return(
    <PageRoom >
    <Toaster
        position="top-right"
        reverseOrder={false}
      />
    <header>
      <div className="content">
        <Link to='/'>
        <img src={logoImg} alt="letmeask" />
        </Link>
        <div>
          <Roomcode code={roomId}/>
          <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
          <ThemeSwitch/>
        </div>
      </div>
    </header>

    <main >
      <div className="room-title">
        <h1>{title}</h1>
        {questions.length > 0  && <span>{questions.length} pergunta(s)</span>} 
      </div>  

      <div className="question-list">
        {questions.map(question => {
          return( 
            <Question 
            key={question.id}
            content={question.content}
            author={question.author}
            isAnswered={question.isAnswered}
            isHighlighted={question.isHighlighted}
          >
            {!question.isAnswered && (
              <>
                  <button
                type="button"
                onClick={() => handleCheckQuestionAsAnswered(question.id)}
                >
                  <img src={checkImg} alt="Marcar pergunta como respondida" />
                </button>

                <button
                  type="button"
                  onClick={() => handleHighlightQuestion(question.id, question.isHighlighted)}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clipRule="evenodd" d="M12 17.9999H18C19.657 17.9999 21 16.6569 21 14.9999V6.99988C21 5.34288 19.657 3.99988 18 3.99988H6C4.343 3.99988 3 5.34288 3 6.99988V14.9999C3 16.6569 4.343 17.9999 6 17.9999H7.5V20.9999L12 17.9999Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

              </>
            )}
            <button
              type="button"
              onClick={() => handleDeleteQuestion(question.id)}
            >
              <img src={deleteImg} alt="Remover Pergunta" />
            </button>
          </Question>
          )
        })}
      </div>
    </main>
    
    </PageRoom>
  )
}