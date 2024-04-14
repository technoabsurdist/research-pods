'use client';

import { PodcastPlayer } from '@/components/podcast-player'
import { SearchBar } from '@/components/search-bar'
import { useState } from 'react'
import { PaperMetadata } from './api/submit/types';
import { PodcastLogoSVG } from '@/components/ui/podcast-logo-svg';

export default function Home() {
    const [processed, setProcessed] = useState(false);
    const [audioUrls, setAudioUrls] = useState<string[]>([]);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    const [metadata, setMetadata] = useState<PaperMetadata | null>(null);
    const [loading, setLoading] = useState(false)

    const handleAudioEnd = () => {
        if (currentAudioIndex < audioUrls.length - 1) {
            setCurrentAudioIndex(currentAudioIndex + 1);
        } else {
            setProcessed(true);
        }
    };

    return (
        <>
            <main className="flex min-h-screen flex-col items-center justify-center space-y-10">
              <PodcastLogoSVG />
              <h1 className='font-mono text-sm font-bold tracking-widest'>Convert Arxiv Papers into Multi-chapter Podcasts</h1>
                <div className="w-[500px] justify-center font-mono text-sm lg:flex">
                    <SearchBar 
                      handleAudioUrls={(urls: string[]) => {
                        setAudioUrls(urls);
                        setCurrentAudioIndex(0);
                        setProcessed(false);
                      }}
                      handleMetadata={m => setMetadata(m)}
                      loading={loading}
                      handleLoading={l => setLoading(l)}
                    />
                </div>
                {loading && (
                    <div className="w-[500px] bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4" role="alert">
                        <div className="flex flex-col items-center font-mono text-xs">
                            <strong>Loading results...</strong>
                            <span>Time estimation: ~30s per PDF page.</span>
                        </div>
                    </div>
                )}
                {audioUrls.length > 0 && (
                    <>
                      <PodcastPlayer 
                        metadata={metadata} 
                        audioUrls={audioUrls} 
                        currentAudioIndex={currentAudioIndex} 
                        handleAudioEnd={handleAudioEnd}
                      />
                    </>
                )}
                <Footer />
            </main>
        </>
    );
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
    );
}
