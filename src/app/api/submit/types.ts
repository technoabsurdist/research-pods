export interface PaperMetadata {
    title: string;
    authors: string[];
    publishedDate: string;
}

export interface Paper {
    metadata: PaperMetadata;
    contents: {page: number, text: string}[] 
}

export enum LinkType {
    PDF='pdf',
    ABS='abs',
}