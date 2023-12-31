'use client'

import * as Dialog from '@radix-ui/react-dialog';
import { useFacialRecognition } from './context';
import { useEffect } from 'react';

declare global {
  interface Window {
    renderWidget(props: object): void
    
  }
}

export function FacialRecognitionModal() {
  const { isOpen, onOpen, onClose } = useFacialRecognition()
 
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (document.getElementById('widget-root')) {
        console.log('observer hit')
        window.renderWidget({
          name: 'Abriu no observer'
        })
        observer.disconnect()
      }
    })
    console.log('observer created...')
    if (isOpen) {
      if (document.getElementById('widget-root')) {
        console.log('div hit')
        window.renderWidget({
          name: 'Abriu de primeira'
        }) // O chatListId vai ser obtido ou pela chamada a essa função ou via search params
        return
      }
      console.log('div miss')
      observer.observe(document.body, {
        subtree: true,
        childList: true,
      })
    }

    return () => {
      console.log('exiting...')
      observer.disconnect()
    }

  }, [isOpen])

  return (
    <Dialog.Root open={isOpen} 
    onOpenChange={() => isOpen ? onClose() : onOpen()}
    >
    
    <Dialog.Portal>
      <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
      <Dialog.Content className="data-[state=open]:animate-contentShow fixed w-[80vw] h-[80vh] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] focus:outline-none">
        <div id="widget-root" ></div>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
  )
}
