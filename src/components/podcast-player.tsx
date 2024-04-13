import { PaperMetadata } from "@/app/api/submit/types";
import { Progress } from "@/components/ui/progress"
import { JSX, SVGProps } from "react";

interface PodcastPlayerProps {
  metadata: PaperMetadata | null;
  audioUrls: string[];
  handleAudioEnd: () => void; 
  currentAudioIndex: number;
}
export function PodcastPlayer({ metadata, audioUrls, handleAudioEnd, currentAudioIndex }: PodcastPlayerProps) {

  
  return (
    <div className="bg-black text-white relative font-mono">
      <svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="1000" height="500" fill="black" />
      </svg>
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-sm font-bold">{metadata && metadata.title.toUpperCase()}</h1>
            <p className="text-xs mt-2">{metadata && metadata.authors.join(', ')}</p>
          </div>
          <div className="space-y-4">
            <UploadIcon className="text-white w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="text-xs justify-left mt-1">page {currentAudioIndex+1} / {audioUrls.length - 1}</p>
            <audio controls autoPlay src={audioUrls[currentAudioIndex]} onEnded={handleAudioEnd} style={{ marginTop: '10px', width: "100%" }}>
                          Your browser does not support the audio element.
            </audio>

          </div>
       </div>
      </div>
    </div>
  )
}

function PlayIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function UploadIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  )
}