import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { Book } from '../../api/Book';
import { BooksService } from '../../service/service-project/books.service';
@Component({

  templateUrl: './book-inactive-list.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['../../../assets/demo/badges.scss']
})
export class BookInactiveListComponent implements OnInit {


  productDialog: boolean;
  deleteProductDialog: boolean = false;
  deleteProductsDialog: boolean = false;

  selectedProducts: Book[];
  submitted: boolean;
  cols: any[];
  statuses: any[];
  bookList:Book[];
  book: Book;
  rowsPerPageOptions = [5, 10, 20];

  constructor(private booksService:BooksService,private router : Router) {}

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

  async getBook(){
    let respuesta:Book[];
    await this.booksService.getAllInactiveBooks().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));
    console.log(respuesta)
    return respuesta;
  }

  async activeBook(id:number){
    Swal.fire({
      icon: 'info',
      title: '¿Desea agregar a la lista de libros disponibles?',
      showConfirmButton: true,
      showCancelButton:true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then(async(result) => {
      if (result.value) {
        console.log('Agregando libro')
        console.log(`Id del libro: ${id}`)

          await this.activeBookById(id);
          console.log("Se modificó el estado correctamente")
          await this.successNotificationActiveBookCorrectly();

      }
    })
  }

  async successNotificationActiveBookCorrectly(){
    let self = this
    Swal.fire({
      icon: 'success',
      title: 'Libro agregado correctamente',
      showConfirmButton: true,
      confirmButtonText: 'Aceptar',
    }).then(async (result) => {
      if (result.value) {
        console.log('Volviendo a lista de libros disponibles')
        await self.router.navigateByUrl('/uikit/bookList');
      }
    })
  }

  async activeBookById(id:number){
    this.booksService.activeBookById(id).toPromise().then((response) => {
    }).catch(e => console.error(e));
  }

}
