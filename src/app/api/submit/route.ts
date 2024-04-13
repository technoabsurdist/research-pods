import { NextResponse } from 'next/server'
import axios from "axios";
import { parseStringPromise } from "xml2js";
import fs, { promises, readFileSync } from 'fs';
import {pdfToPages} from 'pdf-ts';
import path from "path";
import OpenAI from "openai";
import dotenv from 'dotenv';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; 


interface PaperMetadata {
    title: string;
    authors: string[];
    publishedDate: string;
}

interface Paper {
    metadata: PaperMetadata;
    contents: {page: number, text: string}[] 
}

enum LinkType {
    PDF='pdf',
    ABS='abs',
}

export async function GET(request: Request) {
    return NextResponse.json({
        message: "Server running!"
    }); 
}

export async function POST(request: Request) {
    const data = await request.json()
    if (!data.link) {
        return NextResponse.json({ message: 'Link is required' }, { status: 400 })
    }

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

    const audioFilePath = await convertToAudio(paper);

    const fileBuffer = fs.readFileSync(audioFilePath);

    const headers = new Headers({
        'Content-Type': 'audio/mpeg',
        'Content-Length': fileBuffer.length.toString()
    });
    return new NextResponse(fileBuffer, { headers: headers });
}

async function convertToAudio(paper: Paper) {
    const metadataSpeech = `The title of this paper is ${paper.metadata.title}. It was published on ${formatForSpeech(paper.metadata.publishedDate)}. The authors of this paper are: ${paper.metadata.authors}. `
    const speechFile = path.resolve("./speech.mp3");
    dotenv.config();
    const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
    const mp3 = await openai.audio.speech.create({
        model: "tts-1-hd",
        voice: "onyx",
        input: metadataSpeech,
    });
    const buffer = Buffer.from(await mp3.arrayBuffer());
    await fs.promises.writeFile(speechFile, buffer);
    return speechFile;
}


async function getArxivMetadata(arxivId: string): Promise<PaperMetadata | null> {
    try { 
        const response = await axios.get(`http://export.arxiv.org/api/query?id_list=${arxivId}`);
        const result = await parseStringPromise(response.data);
        console.log("result: ", result)
        const entry = result.feed.entry[0]
        const title = entry.title[0].trim();
        const authors = entry.author.map((author: any) => author.name[0]);
        const publishedDate = entry.published[0].trim();
        return {
            title, 
            authors,
            publishedDate
        };
    } catch (error) {
        console.error('Error fetching or parsing data:', error);
        return null;
    }
}

async function downloadArxivPaper(arxivUrl: string, type: LinkType): Promise<{url: string, arxivId: string}> {
    const arxivId = (arxivUrl.split(`/${type}/`)[1]).split('.pdf')[0];
    if (type === LinkType.ABS) {
        arxivUrl = `https://arxiv.org/pdf/${arxivId}.pdf`;
    }
    const response = await axios.get(arxivUrl, { responseType: 'stream' });
    const filePath = `./src/app/api/submit/downloads/${arxivUrl.split('/pdf/')[1]}`
    const writer = fs.createWriteStream(filePath);
  
    response.data.pipe(writer);
  
    new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
    return {url: filePath, arxivId}
}

export async function extractTextFromPaper(paperFilePath: string): Promise<{page: number, text: string}[]> {
    const pdf = await promises.readFile(paperFilePath);
    const pages = await pdfToPages(pdf);
    console.log(pages);
    return pages;
}

function isArxivLink(url: string): boolean {
    const arxivRegex = /^https:\/\/arxiv\.org\/(abs|pdf)\/\d+\.\d+(v\d+)?(\.pdf)?$/;
    return arxivRegex.test(url);
}

function formatForSpeech(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric', // "2022"
        month: 'long', // "June"
        day: 'numeric', // "21"
    });
}