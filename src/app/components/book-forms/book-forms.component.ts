import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../service/countryservice';
import { NodeService } from '../../service/nodeservice';
import { SelectItem } from 'primeng/api';
import { Author } from '../../api/Author';
import { Category } from '../../api/Category';
import { Editorial } from '../../api/Editorial';
import { BooksService } from '../../service/service-project/books.service';
import { AuthorsService } from '../../service/service-project/authors.service';
import { CategoriesService } from '../../service/service-project/categories.service';
import { EditorialService } from '../../service/service-project/editorial.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Book } from 'src/app/api/Book';

@Component({
  
  templateUrl: './book-forms.component.html',
  styleUrls: ['./book-forms.component.scss']
})
export class BookFormsComponent implements OnInit {

  
  valSlider = 50;
  valColor = '#424242';
  valRadio: string;
  valCheck: string[] = [];
  valSwitch: boolean;
  selectedList: SelectItem;
  selectedAuthor: SelectItem[] = [];
  selectedEditorial: SelectItem[] = [];
  selectedCategory:SelectItem[] = [];
  selectedDropAuthor: SelectItem
  selectedDropEditorial: SelectItem
  selectedDropLanguage: SelectItem
  selectedMulti: string[] = [];
  treeSelectNodes: any[];
  selectedNode: SelectItem;
  valToggle = false;
  paymentOptions: any[];
  valSelect1: string;
  valSelect2: string;
  valueKnob = 20;
  selectedDate:any;

  authorsList:Author[];
  editorialList:Editorial[];
  categoriesList:Category[];

  title: string="";
  releaseDate: Date;
  pages: number;
  language: string="";
  description: string="";
  bookCover: string= "";
  stock:number;

  constructor(private countryService: CountryService, 
              private nodeService: NodeService,
              private booksService:BooksService,
              private authorsService:AuthorsService,
              private editorialService:EditorialService,
              private categoriesService:CategoriesService,
              private router : Router) {}

    async ngOnInit(): Promise<void> {
        this.authorsList=await this.getAuthors();
        this.editorialList=await this.getEditorial();
        this.categoriesList=await this.getCategories();

        for(let i=0;i<this.authorsList.length;i++){
          this.selectedAuthor.push(
              {label: this.authorsList[i].name, value: this.authorsList[i]}
          );
        }
        console.log(this.authorsList);

        for(let i=0;i<this.editorialList.length;i++){
          this.selectedEditorial.push(
              {label: this.editorialList[i].editorial, value: this.editorialList[i]}
          );
        }
        console.log(this.editorialList);

        for(let i=0;i<this.categoriesList.length;i++){
          this.selectedCategory.push(
              {label: this.categoriesList[i].category, value: this.categoriesList[i]}
          );
        }
        console.log(this.categoriesList);
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
  

  agregarLibro() {
      console.log(this.title);
      console.log(this.releaseDate);
      console.log(this.selectedDropAuthor);
      console.log(this.selectedDropEditorial);
      console.log(this.language);
      console.log(this.pages);
      console.log(this.description);
      console.log(this.bookCover);
      console.log(this.stock);

      let book:Book={
          title: this.title,
          releaseDate: this.releaseDate,
          authorId: this.selectedDropAuthor['authorId'],
          editorialId:this.selectedDropEditorial['editorialId'],
          language: this.language,
          pages: this.pages,
          description: this.description,
          bookCover: this.bookCover,
          stock: this.stock
      }
      this.postNewBook(book);
      this.successNotificationBookCorrectly();
  }

  async postNewBook(book:Book){
    let respuesta;
    await this.booksService.addBook(book).toPromise().then((response) => {
        respuesta=response;
    }).catch(e => console.error(e));

    return respuesta;
  }
    
  async successNotificationBookCorrectly(){
    let self = this
    Swal.fire({
      icon: 'success',
      title: 'Correcto',
      text: 'Libro agregado correctamente',
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
