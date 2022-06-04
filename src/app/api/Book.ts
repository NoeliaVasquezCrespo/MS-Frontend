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
    stock: number;
    status: number;
}