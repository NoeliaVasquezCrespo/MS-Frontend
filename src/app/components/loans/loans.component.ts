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
    detallePrestamo2: LoanDetails;
    detallePrestamo3: LoanDetails;

    dataSource = new MatTableDataSource();
    fechaAct = new Date();

    products: Product[];
    product: Product
    cols: any[];
    statuses: any[];
    rowsPerPageOptions = [5, 10, 20];
    selectedProducts: Product[];
    deleteProductsDialog: boolean = false;

    
    @ViewChild(MatPaginator) paginatorProducts!: MatPaginator;
    dataSourceProducts!: MatTableDataSource<Book>;

    @ViewChild(MatPaginator, {static:true}) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;


    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    books:Book[] = [];
    displayedColumns: string[] = ['id', 'nombre', 'apellido', 'correo', 'edad','opciones'];
    countries: any[];
    filteredCountries: any[];
    selectedCountryAdvanced: any[];
    valSlider = 50;
    valColor = '#424242';
    valRadio: string;
    valCheck: string[] = [];
    valSwitch: boolean;
    cities: SelectItem[];
    selectedList: SelectItem;
    selectedDrop: SelectItem;
    selectedMulti: string[] = [];
    treeSelectNodes: any[];
    selectedNode: SelectItem;
    valToggle = false;
    paymentOptions: any[];
    valSelect1: string;
    valSelect2: string;
    valueKnob = 20;
    selectedDate:any;

    constructor(private productService: ProductService, private loansService:LoansService , private fb:FormBuilder, private _liveAnnouncer: LiveAnnouncer,
        private countryService: CountryService, private nodeService: NodeService) {
        this.datosPrestamo=this.fb.group({
            clientId: new FormControl('', Validators.required),
            returnDate: new FormControl('', Validators.required)
          })
    }

    async ngOnInit() :Promise<void>{
        this.books = [];
        this.dataSource.data = this.books;

        this.productService.getProducts().then(data => this.products = data);

        this.cols = [
            {field: 'name', header: 'Name'},
            {field: 'price', header: 'Price'},
            {field: 'category', header: 'Category'},
            {field: 'rating', header: 'Reviews'},
            {field: 'inventoryStatus', header: 'Status'}
        ];

        this.statuses = [
            {label: 'INSTOCK', value: 'instock'},
            {label: 'LOWSTOCK', value: 'lowstock'},
            {label: 'OUTOFSTOCK', value: 'outofstock'}
        ];
    }
    ngAfterViewInit(){
        this.dataSource.paginator= this.paginator;
        this.dataSource.sort = this.sort;
      }
    
      announceSortChange(sortState: Sort) {
        if (sortState.direction) {
          this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
          this._liveAnnouncer.announce('Sorting cleared');
        }
      }

    confirmDeleteSelected(){
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        //this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        this.selectedProducts = null;
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
