"use client"
import {SessionProvider} from "next-auth/react"

import React, { ReactNode } from 'react'

type AuthContextProps = {
    children: ReactNode
}
function AuthContext({children}: AuthContextProps) {
  return (
    <SessionProvider>{children}</SessionProvider>
  )
}

export default AuthContext