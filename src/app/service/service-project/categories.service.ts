import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Category } from '../../api/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseUrl:string = 'http://localhost:7878/v1/api/';
  constructor(private http:HttpClient){ }

  getListCategories():Observable<Category[]> {
    const url = `${this.baseUrl}categories`;
    console.log(url);
    return this.http.get<Category[]>(url);
    
  }

  addCategory(categories:Category):Observable<Category>{
    console.log(categories);
    const url = `${this.baseUrl}categories`;
    return this.http.post<Category>(url,categories);
  }
}
