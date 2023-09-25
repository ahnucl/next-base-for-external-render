'use client'
import { useFacialRecognition } from '@/components/context'

export default function Home() {
  const {onOpen} = useFacialRecognition()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button onClick={onOpen}
        className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
        Abrir modal
      </button>
    </div>
  )
}
