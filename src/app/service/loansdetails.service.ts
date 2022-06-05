import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { LoanDetails } from '../api/LoanDetails';

@Injectable({
    providedIn: 'root'
  })
export class LoanDetailsService {
    private baseUrl:string = 'http://localhost:8990/v1/api/';

    constructor(private http:HttpClient){ }

    getAllLoansDetails():Observable<LoanDetails[]>{
        const url = `${this.baseUrl}loanDetails`;
        return this.http.get<LoanDetails[]>(url).pipe(
          map(
            response => response, error => error));
    }

    addLoanDetails(loanDetails:LoanDetails):Observable<LoanDetails>{
        const url = `${this.baseUrl}loanDetails`;
        return this.http.post<LoanDetails>(url, loanDetails).pipe(
          map(
            response => response, error => error));
    }

    getLoanDetailsById(id: number):Observable<LoanDetails>{
        const url = `${this.baseUrl}loanDetails/${id}`;
        return this.http.get<LoanDetails>(url).pipe(
            map(
              response => response, error => error));
    }

    updateLoanDetails(id: number, loanDetails:LoanDetails):Observable<LoanDetails>{
        const url = `${this.baseUrl}loanDetails/${id}`;
        return this.http.put<LoanDetails>(url, loanDetails).pipe(
            map(
              response => response, error => error));
    }
}