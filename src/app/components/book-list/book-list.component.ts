import { Component, OnInit } from '@angular/core';
import { Book } from '../../api/Book';
import { BooksService } from '../../service/service-project/books.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Author } from 'src/app/api/Author';
import {SelectItem} from "primeng/api"
import { Editorial } from 'src/app/api/Editorial';

@Component({
 
  templateUrl: './book-list.component.html',
  styleUrls: ['../../../assets/demo/badges.scss']
})
export class BookListComponent implements OnInit {

  
  bookDialog: boolean;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;
  
  
  selectedProducts: Book[];
  submitted: boolean;
  cols: any[];
  statuses: any[];
  bookList:Book[];
  book: Book;
  rowsPerPageOptions = [5, 10, 20];
  books:Book={
    authorId: 0, bookId: 0, editorialId: 0, title: "", description: "", language: "", pages: 0, bookCover: "", stock: 0, status: 0,
    releaseDate: undefined
  }
    
  listAuthor:Author[]=[];
  authors:SelectItem[]=[];

  listEditorials:Editorial[]=[];
  editorials:SelectItem[]=[];

  selectedDropAuthor: SelectItem;
  selectedDropEditorial: SelectItem;
  constructor(private booksService:BooksService,
              private router : Router) {}

    async ngOnInit(): Promise<void> {
      
      this.bookList=await this.getBook();
      this.cols = [
          {field: 'bookId', header: 'bookId'},
          {field: 'title', header: 'title'},
          {field: 'pages', header: 'pages'},
          {field: 'language', header: 'language'},
          {field: 'description', header: 'description'},
          {field: 'authorId', header: 'authorId'}
      ];

  }

  deleteSelectedProducts() {
      this.deleteProductsDialog = true;
  }

 /* editProduct(product: Product) {
      this.product = {...product};
      this.productDialog = true;
  }*/

  async deleteBook(id:number){
    Swal.fire({
      icon: 'info',
      title: '¿Desea eliminar de la lista de libros disponibles?',
      showConfirmButton: true,
      showCancelButton:true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then(async(result) => {
      if (result.value) {
        console.log('Agregando libro como no disponible')
        console.log(`Id del libro: ${id}`)
        
          await this.deleteBookById(id);
          console.log("Se modificó el estado del libro correctamente")
          await this.successNotificationInactiveBookCorrectly();
        
      }
    })
  }

  async successNotificationInactiveBookCorrectly(){
    let self = this
    Swal.fire({
      icon: 'success',
      title: 'Libro eliminado de la lista correctamente',
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
    }).then(async (result) => {
      if (result.value) {
        console.log('Volviendo a lista de libros disponibles')
        await self.router.navigateByUrl('/uikit/bookInactiveList');
      }
    })
  }

  async deleteBookById(id:number){
    this.booksService.deleteActiveBook(id).toPromise().then((response) => {
    }).catch(e => console.error(e));
  }

  

  hideDialog() {
      this.bookDialog = false;
      this.submitted = false;
  }
  
  async getBook(){
    let respuesta:Book[];
    await this.booksService.getAllActiveBooks().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));
    console.log(respuesta)
    return respuesta;
  }

  async editBook(book: Book) {
    console.log(book);
    let bookResp:Book=await this.getBookById(book.bookId);
    console.log(bookResp);
    this.book = {...bookResp};
    this.bookDialog = true;
    for(let i=0;i<this.authors.length;i++){
        if(this.authors[i].value['authorId']===this.book.authorId){
            this.selectedDropAuthor=this.authors[i].value;
        }
    }
    console.log(this.selectedDropAuthor);

    for(let i=0;i<this.editorials.length;i++){
      if(this.editorials[i].value['editorialId']===this.book.editorialId){
          this.selectedDropEditorial=this.editorials[i].value;
      }
  }
  console.log(this.selectedDropEditorial);

}

async getBookById(id:number){
  let respuesta;
  await this.booksService.getBookById(id).toPromise().then((response) => {
      respuesta=response;
  }).catch(e => console.error(e));
  return respuesta;
}

async saveBook() {
  console.log(this.book);
  await this.updateBook(this.book.bookId);

  //this.client = [...this.client];
  this.bookDialog = false;
  // this.submitted = true;
  this.bookList=[];
  this.bookList = await this.getBook();
  console.log(this.bookList)
  await this.successNotificationEditBookCorrectly();
}

async updateBook(id){
  let respuesta;
  await this.booksService.updateBooks(id,this.book).toPromise().then((response) => {
      respuesta=response;
  }).catch(e => console.error(e));
  return respuesta;
}

async successNotificationEditBookCorrectly(){
  let self = this
  Swal.fire({
    icon: 'success',
    title: 'Datos del libro modificados corrctamente',
    showConfirmButton: true,
    confirmButtonText: 'Aceptar',
  }).then(async (result) => {
    if (result.value) {
      console.log('Volviendo a lista de libros disponibles')
      await self.router.navigateByUrl('/uikit/bookList');
    }
  })
}
}
