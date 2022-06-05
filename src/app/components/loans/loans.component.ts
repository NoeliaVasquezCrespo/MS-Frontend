import { Component, OnInit } from '@angular/core';
import { LoansService } from '../../service/service-project/loans.service';
import {MatTableDataSource} from '@angular/material/table';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { LoanDetailsService } from '../../service/loansdetails.service';
import { Loan } from '../../api/Loan';
import { LoanDetails } from '../../api/LoanDetails';
import { Book } from '../../api/Book';
import { BooksService } from '../../service/service-project/books.service';
import Swal from'sweetalert2';
import { Product } from '../../api/product';
import { ProductService } from '../../service/productservice';


@Component({
  selector: 'app-info-forms',
  templateUrl: './loans.component.html',
  styles: [`:host ::ng-deep .p-multiselect {
    min-width: 15rem;
}

:host ::ng-deep .multiselect-custom-virtual-scroll .p-multiselect {
    min-width: 20rem;
}

:host ::ng-deep .multiselect-custom .p-multiselect-label,  {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;

}

:host ::ng-deep .multiselect-custom .country-item.country-item-value {
    padding: .25rem .5rem;
    border-radius: 3px;
    display: inline-flex;
    margin-right: .5rem;
    background-color: var(--primary-color);
    color: var(--primary-color-text);
}

:host ::ng-deep .multiselect-custom .country-item.country-item-value img.flag {
    width: 17px;
}

:host ::ng-deep .multiselect-custom .country-item {
    display: flex;
    align-items: center;
}

:host ::ng-deep .multiselect-custom .country-item img.flag {
    width: 18px;
    margin-right: .5rem;
}

:host ::ng-deep .multiselect-custom .country-placeholder {
    padding: 0.25rem;
}

`]
})
export class LoansComponent implements OnInit {
    prestamo: Loan;
    datosPrestamo: FormGroup;
    detallePrestamo: LoanDetails;
    fechaAct = new Date();
    books:Book[] = [];
    dataSource = new MatTableDataSource();
    cols: any[];
    countries: [];
    products: Product[];
    product: Product
   
    rowsPerPageOptions = [5, 10, 20];
    selectedBooks: Book[];

    filteredCountries: any[];
  
    
    constructor(private productService: ProductService, private loansService:LoansService , 
        private fb:FormBuilder, private booksService:BooksService, private loanDetailsService:LoanDetailsService ) {
        this.datosPrestamo=this.fb.group({
            clientId: new FormControl('', Validators.required),
            returnDate: new FormControl('', Validators.required)
        })
    }

    async ngOnInit() :Promise<void>{
        this.countries = [];
        this.cols = [
            {field: 'id', header: 'ID'},
            {field: 'title', header: 'Titulo'},
            {field: 'pages', header: 'Páginas'},
            {field: 'stock', header: 'Stock'}
        ];

        this.dataSource.data = this.books;
        await this.booksService.getAllActiveBooks().toPromise().then((response) => {
            this.books = response;
          }).catch(e => console.error(e));
          console.log(this.books)

        this.productService.getProducts().then(data => this.products = data);

    }

    filterCountry(event) {
        const filtered: any[] = [];
        const query = event.query;
        for (let i = 0; i < this.countries.length; i++) {
            const country = this.countries[i];
            /*if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
                filtered.push(country);
            }*/
        }

        this.filteredCountries = filtered;
    }
    
    async addLoansDetails(loanid:number){
        console.log(this.selectedBooks);
        this.selectedBooks.forEach(async b => {
            console.log("Libro Id");
            console.log(b.bookId);
            let bookLoans:LoanDetails={
                bookId: b.bookId,
                loanId: loanid,
                loanStatus: "prestado",
                status: 1
            }
            await this.addLoanDetalils(bookLoans);
            await this.updateStockBook(b.bookId);
        })
        this.selectedBooks = null;
    }

    async updateStockBook(id:number){
        this.booksService.updateStockBook(id).subscribe(
            async resp => {
              console.log("Stock Libro Actualizado");
              console.log(resp.stock);
            }, error => {
              console.log("error");
           });
    }

    async addLoanDetalils(loanDetails:LoanDetails){
        this.loanDetailsService.addLoanDetails(loanDetails).subscribe(
            async resp => {
              console.log("Prestamo de un Libro Registrado");
              console.log(resp);
            }, error => {
              console.log("error");
           });
    }  
  
    addLoan(){
        let addLoans:Loan={
            clientId: this.datosPrestamo.value.clientId,
            loanDate: this.fechaAct,
            returnDate: this.datosPrestamo.value.returnDate,
            status: 1
        }
       console.log(this.datosPrestamo.value.returnDate);
       
        this.loansService.addLoan(addLoans).subscribe(
            async resp => {
                console.log("Prestamo Registrado");
                console.log(resp);
                await this.addLoansDetails(resp.loanId);
                this.successNotification();
            }, error => {
              console.log("error");
           });
    }

    successNotification(){
        Swal.fire({
          title: 'Prestamo Registrado',
          text: 'Se registro el prestamo de los libros correctamente',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'Ok',
        }).then(async (result) => {
          if (result.value) {
            location.reload();
          }
        })
      }
}
