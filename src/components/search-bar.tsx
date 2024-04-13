import { SetStateAction, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaperMetadata } from '@/app/api/submit/types';

interface SearchBarProps {
  handleAudioUrls: (urls: string[]) => void;
  handleMetadata: (metadata: PaperMetadata) => void; 
}

export function SearchBar({handleAudioUrls, handleMetadata}: SearchBarProps) {
  const [link, setLink] = useState('');

  const handleInputChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setLink(event.target.value);
  };

  const submitLink = async () => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ link })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      handleAudioUrls(data.audioUrls);
      handleMetadata(data.metadata);
    } catch (error) {
      console.error('Error submitting link:', error);
      handleAudioUrls([]);
    }
  };

  return (
    <div className="flex w-full items-center space-x-4">
      <div className="flex w-full max-w-lg items-center space-x-4">
        <Input
          aria-describedby="file-description"
          placeholder="Enter arxiv link to convert"
          type="text"
          onChange={handleInputChange}
          value={link}
        />
        <Button onClick={submitLink} type="submit">Convert</Button>
      </div>
    </div>
  );
}

