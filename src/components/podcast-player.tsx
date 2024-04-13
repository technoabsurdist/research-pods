import { Progress } from "@/components/ui/progress"
import { JSX, SVGProps } from "react";

export function PodcastPlayer() {

  return (
    <div className="bg-black text-white relative font-mono">
      <svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="1000" height="500" fill="black" />
      </svg>
      <div className="absolute inset-0 flex flex-col justify-between p-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-sm font-bold">LATENT SPACE: THE AI ENGINEER PODCAST</h1>
            <p className="text-xs mt-2">Practitioners talking LLMS, CodeGen, Agents, Multimodality, AI UX, GPU in...</p>
          </div>
          <div className="space-y-4">
            <UploadIcon className="text-white w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <button className="w-6 h-6 mr-5 rounded-full bg-white flex items-center justify-center">
              <PlayIcon className="text-black w-3 h-3" />
            </button>
            <span className="text-sm">0:00</span>
            <div className="flex-1 mx-4">
              <Progress className="w-full" value={40} />
            </div>
            <span className="text-sm">-56:19</span>

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