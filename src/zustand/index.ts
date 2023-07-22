"use client"
import { User } from '@prisma/client';
import {create} from 'zustand';

type storeType = {
    user: User | null;
    setUser: (user: User | null) => void
}

const useStore = create<storeType>((set) => ({
  user: null,
  setUser: (user) => {
    set((state) => ({
        user
    }))
  }
}))

export default useStore;