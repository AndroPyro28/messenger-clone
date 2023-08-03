'use client'
import useConversation from '@/hooks/useConversation'
import { FullMessageType } from '@/types'
import React, { useEffect, useRef, useState } from 'react'
import MessageBox from './MessageBox'
import axios from 'axios'
import { useSession } from 'next-auth/react'

type BodyProps = {
  initialMessages: FullMessageType[]
}

const Body:React.FC<BodyProps> = ({initialMessages}) => {
  const [messages, setMessages] = useState(initialMessages)
  const bottomRef = useRef<HTMLDivElement>(null)
  const {conversationId} = useConversation()

  const session = useSession()

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`)
  }, [conversationId])
  
  if(session.status ==='loading') return <div className='flex-1 text-center'>loading...</div>

  return (
    <div className='flex-1 overflow-y-auto'>
      <div ref={bottomRef} className='pt-24'>
        {messages.map((message, index) => {
          return <MessageBox isLast={index === messages.length - 1} key={message.id} data={message} />
        })}
      </div>
    </div>
  )
}

export default Body