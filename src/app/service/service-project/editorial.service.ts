import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Editorial } from '../../api/Editorial';
@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  private baseUrl:string = 'http://localhost:7878/v1/api/';
  constructor(private http:HttpClient){ }

  getListEditorial():Observable<Editorial[]> {
    const url = `${this.baseUrl}editorial`;
    console.log(url);
    return this.http.get<Editorial[]>(url);
    
  }

  addEditorial(editorials:Editorial):Observable<Editorial>{
    console.log(editorials);
    const url = `${this.baseUrl}editorial`;
    return this.http.post<Editorial>(url,editorials);
  }
}
