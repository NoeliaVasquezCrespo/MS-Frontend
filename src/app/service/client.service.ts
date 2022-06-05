import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Address} from "../api/Address";
import {HttpClient} from "@angular/common/http";
import {Client} from "../api/Client";
import {ClientDetails} from "../api/ClientDetails";

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

    getAddressById(id:number):Observable<Address>{
        const url = `${this.baseUrl}address/${id}`;
        console.log(url);
        return this.http.get<Address>(url);
    }

    postClient(client:Client):Observable<Client>{
        console.log(client);
        const url = `${this.baseUrl}client`;
        return this.http.post<Client>(url,client);
    }
    updateClient(id:number,client:Client):Observable<Client>{
        console.log(client);
        const url = `${this.baseUrl}client/${id}`;
        return this.http.put<Client>(url,client);
    }
    deleteClient(id:number):Observable<boolean>{
        const url = `${this.baseUrl}client/${id}`;
        return this.http.delete<boolean>(url);
    }
    getClients():Observable<ClientDetails[]>{
        const url = `${this.baseUrl}client/details`;
        return this.http.get<ClientDetails[]>(url);
    }
    getClientById(id:number){
        const url = `${this.baseUrl}client/${id}`;
        return this.http.get<Client>(url);

    }
}
