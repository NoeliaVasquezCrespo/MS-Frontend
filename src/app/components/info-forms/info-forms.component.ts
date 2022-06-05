import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../service/countryservice';
import { NodeService } from '../../service/nodeservice';
import { SelectItem } from 'primeng/api';
import { Author } from '../../api/Author';
import { Category } from '../../api/Category';
import { Editorial } from '../../api/Editorial';
import { AuthorsService } from '../../service/service-project/authors.service';
import { CategoriesService } from '../../service/service-project/categories.service';
import { EditorialService } from '../../service/service-project/editorial.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-info-forms',
  templateUrl: './info-forms.component.html',
  styleUrls: ['./info-forms.component.scss']
})
export class InfoFormsComponent implements OnInit {

    selectedDropAuthor: SelectItem
    selectedDropEditorial: SelectItem
    selectedDropLanguage: SelectItem
    selectedMulti: string[] = [];
    rowsPerPageOptions = [5, 10, 20];
    authorsList:Author[];
    editorialList:Editorial[];
    categoriesList:Category[];
  
    name: string="";
    category: string="";
    editorial: string="";

    submitted: boolean;
    cols: any[];
    statuses: any[];

    authorList:Author[];
    author: Author;

    categoryList:Category[];
    categories: Category;

    editorialsList:Editorial[];
    editorials: Editorial;
  

  constructor(private authorsService:AuthorsService,
              private editorialService:EditorialService,
              private categoriesService:CategoriesService,
              private router : Router) {}

 async  ngOnInit() {
    this.authorList=await this.getAuthors();
    this.cols = [
        {field: 'authorId', header: 'authorId'},
        {field: 'name', header: 'name'}
    ];

    this.categoryList=await this.getCategories();
    this.cols = [
        {field: 'categoryId', header: 'categoryId'},
        {field: 'category', header: 'category'}
    ];

    this.editorialsList=await this.getEditorial();
    this.cols = [
        {field: 'editorialId', header: 'editorialId'},
        {field: 'editorial', header: 'editorial'}
    ];

  }
  async getAuthors(){
    let respuesta:Author[];
    
    await this.authorsService.getListAuthors().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));
    console.log(respuesta);
    return respuesta;
  }

  async getEditorial(){
    let respuesta:Editorial[];
    
    await this.editorialService.getListEditorial().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));
    console.log(respuesta);
    return respuesta;
  }

  async getCategories(){
    let respuesta:Category[];
    await this.categoriesService.getListCategories().toPromise().then((response) => {
      respuesta = response;
    }).catch(e => console.error(e));
    console.log(respuesta);
    return respuesta;
  }

 

  agregarAutor() {
    console.log(this.name);

    let author:Author={
        name: this.name,
    }
    this.postNewAuthor(author);
    this.successNotificationAuthorCorrectly();
    }

    async postNewAuthor(author:Author){
    let respuesta;
    await this.authorsService.addAuthor(author).toPromise().then((response) => {
        respuesta=response;
    }).catch(e => console.error(e));

    return respuesta;
    }
    
    async successNotificationAuthorCorrectly(){
    let self = this
    Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Autor agregado correctamente',
        showConfirmButton: true,
        confirmButtonText: 'Aceptar',
    }).then(async (result) => {
        if (result.value) {
        console.log('Volviendo a lista de libros disponibles')
        await self.router.navigateByUrl('/uikit/bookList');
        }
    })
    }

    agregarCategoria() {
        console.log(this.category);
    
        let categories:Category={
            category: this.category,
        }
        this.postNewCategory(categories);
        this.successNotificationCategoryCorrectly();
    }
    
    async postNewCategory(categories:Category){
        let respuesta;
        await this.categoriesService.addCategory(categories).toPromise().then((response) => {
            respuesta=response;
        }).catch(e => console.error(e));
    
        return respuesta;
    }
        
    async successNotificationCategoryCorrectly(){
        let self = this
        Swal.fire({
            icon: 'success',
            title: 'Correcto',
            text: 'Categoría agregada correctamente',
            showConfirmButton: true,
            confirmButtonText: 'Aceptar',
        }).then(async (result) => {
            if (result.value) {
            console.log('Volviendo a lista de libros disponibles')
            await self.router.navigateByUrl('/uikit/bookList');
            }
        })
    }

    agregarEditorial() {
    console.log(this.editorial);

    let editorials:Editorial={
        editorial: this.editorial,
    }
    this.postNewEditorial(editorials);
    this.successNotificationEditorialCorrectly();
    }

    async postNewEditorial(editorials:Editorial){
    let respuesta;
    await this.editorialService.addEditorial(editorials).toPromise().then((response) => {
        respuesta=response;
    }).catch(e => console.error(e));

    return respuesta;
    }
    
    async successNotificationEditorialCorrectly(){
    let self = this
    Swal.fire({
        icon: 'success',
        title: 'Correcto',
        text: 'Editorial agregada correctamente',
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
