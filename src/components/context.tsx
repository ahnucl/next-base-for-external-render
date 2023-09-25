'use client'

import Script from "next/script";
import { createContext, ReactNode, useContext, useState } from "react";
import { FacialRecognitionModal } from "./modal";

interface FacialRecognitionContextData {
  isOpen: boolean
  onClose(): void
  onOpen(): void
}

interface FacialRecognitionProviderProps {
  children: ReactNode
}

const FacialRecognitionContext = createContext({} as FacialRecognitionContextData)

export function FacialRecognitionProvider({ children }: FacialRecognitionProviderProps) {
  const [open, setOpen] = useState(false)

  return (
    <FacialRecognitionContext.Provider value={{
      isOpen: open,
      onClose: () => setOpen(false),
      onOpen: () => setOpen(true),
    }}>
      {children}
      
      <Script 
        async 
        src="http://localhost:8080/assets/main-c6aa2ead.js" 
        type="module" 
        strategy="lazyOnload"
      />

      <FacialRecognitionModal />
    </FacialRecognitionContext.Provider>
  )
}

export function useFacialRecognition() {
  const context = useContext(FacialRecognitionContext)

  return context
}


