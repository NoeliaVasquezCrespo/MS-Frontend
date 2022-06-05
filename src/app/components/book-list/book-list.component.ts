import { Component, OnInit } from '@angular/core';
import { Book } from '../../api/Book';
import { BooksService } from '../../service/service-project/books.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
 
  templateUrl: './book-list.component.html',
  styleUrls: ['../../../assets/demo/badges.scss']
})
export class BookListComponent implements OnInit {

  
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

  constructor(
              private booksService:BooksService ,
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
      this.productDialog = false;
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
}
