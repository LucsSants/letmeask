import { FormEvent, useEffect, useState } from 'react'
import {useParams, Link, useHistory} from 'react-router-dom'

import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'

import { Button } from '../components/Button'
import { Question } from '../components/Question'
import { Roomcode } from '../components/RoomCode'
import { useAuth } from '../hooks/useAuth'
import { useRom } from '../hooks/useRoom'
import { database } from '../services/firebase'

import '../styles/room.scss'

type RoomParams = {
  id: string
}

export function AdminRoom() {
  const {user}= useAuth();

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

  return(
    <div id="page-room">
    <header>
      <div className="content">
        <img src={logoImg} alt="letmeask" />
        <div>
          <Roomcode code={roomId}/>
          <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
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
          >
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
    
    </div>
  )
}