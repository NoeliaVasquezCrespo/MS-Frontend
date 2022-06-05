import { Component, OnInit } from '@angular/core';
import { Book } from '../../api/Book';
import { BooksService } from '../../service/service-project/books.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class DashboardComponent implements OnInit {

 
  
  
  selectedProducts: Book[];
  submitted: boolean;
  cols: any[];
  statuses: any[];
  bookList:Book[];
  book: Book;
  rowsPerPageOptions = [5, 10, 20];

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

  async getBook(){
    let respuesta:Book[];
    await this.booksService.getAllActiveBooks().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));
    console.log(respuesta)
    return respuesta;
  }
}
