import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function SearchBar() {
  return (
    <div className="flex w-full items-center space-x-4">
      <div className="flex w-full max-w-lg items-center space-x-4">
        <Input aria-describedby="file-description" placeholder="Enter arxiv link to convert" type="text" />
        <Button type="submit">Convert</Button>
      </div>
    </div>
  )
}
