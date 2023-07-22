"use client"
import { User } from '@prisma/client'
import React from 'react'
import Image from 'next/image'
type AvatarProps = {
    user?: User
}

const Avatar: React.FC<AvatarProps> = ({user}) => {
  return (
    <div className='relative'>
        <div className='relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11'>
            <Image alt="avatar" src={user?.image || '/images/placeholder.jpg'} fill />
        </div>
        <span className='absolute rounded-full block bg-green-500 ring-2 ring-white top-0 h-2 w-2 md:h-3 md:w-3'></span>
    </div>
  )
}

export default Avatar