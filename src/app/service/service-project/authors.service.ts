import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Author } from '../../api/Author';
@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  private baseUrl:string = 'http://localhost:7878/v1/api/';
  constructor(private http:HttpClient){ }

  getListAuthors():Observable<Author[]> {
    const url = `${this.baseUrl}authors`;
    console.log(url);
    return this.http.get<Author[]>(url);
    
  }
  
}
