import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Book } from '../../api/Book';
@Injectable({
  providedIn: 'root'
})
export class BooksService {

  // private baseUrl:string = 'http://localhost:8080/v1/api/';
  private baseUrl:string = 'http://localhost:7878/v1/api/';
  constructor(private http:HttpClient){ }

  getAllActiveBooks():Observable<Book[]>{
      const url = `${this.baseUrl}books/list/1`;
      return this.http.get<Book[]>(url).pipe(
        map(
          response => response, error => error));
  }

  getAllInactiveBooks():Observable<Book[]>{
    const url = `${this.baseUrl}books/list/0`;
    return this.http.get<Book[]>(url).pipe(
      map(
        response => response, error => error));
  }

  addBook(book:Book):Observable<Book>{
      const url = `${this.baseUrl}books`;
      return this.http.post<Book>(url, book).pipe(
        map(
          response => response, error => error));
  }

  getBookById(id: number):Observable<Book>{
      const url = `${this.baseUrl}books/${id}`;
      return this.http.get<Book>(url).pipe(
          map(
            response => response, error => error));
  }

  updateBooks(id: number, book:Book):Observable<Book>{
      const url = `${this.baseUrl}books/${id}`;
      return this.http.put<Book>(url, book).pipe(
          map(
            response => response, error => error));
  }

  activeBookById(id: Number):Observable<Book>{
    const url = `${this.baseUrl}books/status/${id}`;
    return this.http.put<Book>(url,id).pipe(
        map(
          response => response, error => error));
  }
}
