import { Component, OnInit,ViewChild } from '@angular/core';
import { CountryService } from '../../service/countryservice';
import { NodeService } from '../../service/nodeservice';
import { SelectItem } from 'primeng/api';
import { LoansService } from '../../service/service-project/loans.service';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { LoanDetailsService } from '../../service/loansdetails.service';
import { Loan } from '../../api/Loan';
import { LoanDetails } from '../../api/LoanDetails';
import { Book } from '../../api/Book';
import { BooksService } from '../../service/service-project/books.service';

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

    products: Product[];
    product: Product
   
    rowsPerPageOptions = [5, 10, 20];
    selectedProducts: Product[];
    deleteProductsDialog: boolean = false;

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    
    constructor(private productService: ProductService, private loansService:LoansService , 
        private fb:FormBuilder, private booksService:BooksService ) {
        this.datosPrestamo=this.fb.group({
            clientId: new FormControl('', Validators.required),
            returnDate: new FormControl('', Validators.required)
        })
    }

    async ngOnInit() :Promise<void>{
    
        this.dataSource.data = this.books;
        await this.booksService.getAllActiveBooks().toPromise().then((response) => {
            this.books = response;
          }).catch(e => console.error(e));
          console.log(this.books)

        this.productService.getProducts().then(data => this.products = data);

    }
    
    

    
    async getAdminData(){
        /*let respuesta;
        console.log("PRIMER METODO");
        await this.adminlistService. getListProvider().toPromise().then((response) => {
          respuesta = response;
        }).catch(e => console.error(e));
    
        return respuesta;*/
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
            resp => {
              console.log("Prestamo Registrado");
              console.log(resp);
            }, error => {
              console.log("error");
           });
    }
}
