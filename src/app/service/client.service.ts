import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Address} from "../api/Address";
import {HttpClient} from "@angular/common/http";
import {Client} from "../api/Client";

@Injectable({
  providedIn: 'root'
})
export class ClientService {
    private baseUrl:string = 'http://localhost:7000/v1/api/';
    constructor(private http:HttpClient) {

    }
    getAddresses():Observable<Address[]> {
        const url = `${this.baseUrl}address`;
        console.log(url);
        return this.http.get<Address[]>(url);
    }
    postClient(client:Client):Observable<Client>{
        console.log(client);
        const url = `${this.baseUrl}client`;
        return this.http.post<Client>(url,client);
    }
}
