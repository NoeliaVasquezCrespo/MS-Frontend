import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { Loan } from '../api/Loan';

@Injectable({
    providedIn: 'root'
  })
export class LoansService {
    private baseUrl:string = 'http://localhost:8080/v1/api/';

    constructor(private http:HttpClient){ }

    getAllLoans():Observable<Loan[]>{
        const url = `${this.baseUrl}loans`;
        return this.http.get<Loan[]>(url).pipe(
          map(
            response => response, error => error));
    }

    addLoan(loan:Loan):Observable<Loan>{
        const url = `${this.baseUrl}loans`;
        return this.http.post<Loan>(url, loan).pipe(
          map(
            response => response, error => error));
    }

    getLoanById(id: number):Observable<Loan>{
        const url = `${this.baseUrl}loans/${id}`;
        return this.http.get<Loan>(url).pipe(
            map(
              response => response, error => error));
    }

    updateLoans(id: number, loan:Loan):Observable<Loan>{
        const url = `${this.baseUrl}loans/${id}`;
        return this.http.put<Loan>(url, loan).pipe(
            map(
              response => response, error => error));
    }
}