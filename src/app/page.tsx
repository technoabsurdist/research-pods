import { PodcastPlayer } from '@/components/podcast-player'
import { SearchBar } from '@/components/search-bar'

export default function Home() {
  return (
    <>
     <main className="flex min-h-screen flex-col items-center justify-center space-y-10">
      <div className="w-[500px] justify-center font-mono text-sm lg:flex">
        <SearchBar />
      </div>
       <PodcastPlayer />
      <Footer /> 
    </main>
    </>
  )
}

function Footer() {
  return (
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols lg:text-center font-mono">
        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-1 text-lg font-semibold`}>
            See the code{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 text-xs opacity-50`}>
            Star Github repository to support the project.
          </p>
        </a>
     </div>
  )
}