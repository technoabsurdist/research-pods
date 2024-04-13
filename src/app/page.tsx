'use client';

import { PodcastPlayer } from '@/components/podcast-player'
import { SearchBar } from '@/components/search-bar'
import { useState } from 'react'

export default function Home() {
  const [processed, setProcessed] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  return (
    <>
     <main className="flex min-h-screen flex-col items-center justify-center space-y-10">
      <div className="w-[500px] justify-center font-mono text-sm lg:flex">
        <SearchBar handleAudioUrl={(url: string) => setAudioUrl(url)}/>
      </div>
      {audioUrl && (
        <audio controls src={audioUrl} style={{ marginTop: '10px' }}>
          Your browser does not support the audio element.
        </audio>
      )}
       {processed && <PodcastPlayer />}
      <Footer /> 
    </main>
    </>
  )
}

function Footer() {
  return (
      <div className="mt-20 mb-12 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols lg:text-center font-mono">
        <a
          href="https://github.com/technoabsurdist/research-pods"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className={`m-0 text-xs opacity-50`}>
            <span className='underline'><strong>Github</strong></span>.{' '}
            By @technoabsurdist
          </p>
        </a>
     </div>
  )
}