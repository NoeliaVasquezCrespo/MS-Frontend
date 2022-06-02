export interface Book {
    bookId?: number;
    title: string;
    releaseDate: Date;
    authorId: number;
    editorialId:number;
    language: string;
    pages: number;
    description: string;
    bookCover: string;
    status: number;
}