import { NextResponse } from 'next/server'
import { convertToAudio, downloadArxivPaper, extractTextFromPaper, getArxivMetadata, isArxivLink } from './helpers';
import { LinkType } from './types';


export async function GET(request: Request) {
    return NextResponse.json({
        message: "Server running :)"
    }); 
}

export async function POST(request: Request) {
    const data = await request.json()
    if (!data.link) {
        return NextResponse.json({ message: 'Link is required' }, { status: 400 })
    }
    console.log("Processing Arxiv: ", data.link); 

    const { link } = data
    if (!isArxivLink(link)) {
        return NextResponse.json({ message: 'Invalid arxiv link' }, { status: 400 })
    }

    const linkType = link.endsWith('.pdf') ? LinkType.PDF : LinkType.ABS
    const {url: paperFilePath, arxivId} = await downloadArxivPaper(link, linkType)
    const metadata = await getArxivMetadata(arxivId); 
    if (!metadata) {
        throw new Error("Could not fetch metadata")
    }

    const contents = await extractTextFromPaper(paperFilePath); 
    if (!contents) {
        throw new Error("Could not extract content from paper :(")
    }
    const paper = {metadata, contents}

    const audioUrls = await convertToAudio(paper);
    
    
    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    console.log("==> Completed! Audio URLs: ", audioUrls)
    return new NextResponse(JSON.stringify({ audioUrls, metadata }), { headers });
}