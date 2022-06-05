import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../service/client.service";
import {Client} from "../../api/Client";
import {Product} from "../../api/product";
import {ClientDetails} from "../../api/ClientDetails";
import {Address} from "../../api/Address";
import {SelectItem} from "primeng/api";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

    listaClientes:ClientDetails[];
    client:Client={addressId: 0, clientId: 0, email: "", lastname: "", name: "", phone: 0, status: 0}
    submitted: boolean;
    clientDialog: boolean;
    deleteClientsDialog: boolean = false;
    selectedClients: ClientDetails[];
    public cols: any[];

    listAddresses:Address[]=[];
    addresses:SelectItem[]=[];

    selectedDrop: SelectItem;

    constructor(private clientService:ClientService) { }

    async ngOnInit(): Promise<void> {
        this.listaClientes = await this.getClients();
        console.log(this.listaClientes)

        this.cols = [
            {field: 'nombre', header: 'Nombre'},
            {field: 'apellido', header: 'Apellido'},
            {field: 'email', header: 'Email'},
            {field: 'phone', header: 'phone'},
            {field: 'address', header: 'Address'}
        ];

        this.listAddresses=await this.getAddresses();
        for(let i=0;i<this.listAddresses.length;i++){
            this.addresses.push(
                {label: this.listAddresses[i].address, value: this.listAddresses[i]}
            );
        }

    }

    async getClients(){
        let respuesta;
        await this.clientService.getClients().toPromise().then((response) => {
            respuesta=response;
        }).catch(e => console.error(e));
        return respuesta;
    }

    async getAddresses(){
        let respuesta;
        await this.clientService.getAddresses().toPromise().then((response) => {
            respuesta=response;
        }).catch(e => console.error(e));
        return respuesta;
    }

    openNew() {
        this.client={addressId: 0, clientId: 0, email: "", lastname: "", name: "", phone: 0, status: 0}
        this.submitted = false;
        this.clientDialog = true;
    }

    deleteSelectedClients() {
        this.deleteClientsDialog = true;
    }

    async editClient(clientDetails: ClientDetails) {
        console.log(clientDetails);
        let clientResp:Client=await this.getClientById(clientDetails.clientId);
        console.log(clientResp);
        this.client = {...clientResp};
        this.clientDialog = true;
        for(let i=0;i<this.addresses.length;i++){
            if(this.addresses[i].value['addressId']===this.client.addressId){
                this.selectedDrop=this.addresses[i].value;
            }
        }
        console.log(this.selectedDrop);

    }

    async deleteClient(clientDetails: ClientDetails) {
        this.deleteClientsDialog = true;
        let clientResp:Client=await this.getClientById(clientDetails.clientId);
        console.log(clientResp);
        this.client = {...clientResp};
        //this.product = {...product};
    }

    async confirmDelete() {
        this.deleteClientMethod(this.client.clientId);
        this.listaClientes=[];
        this.listaClientes = await this.getClients();
        console.log(this.listaClientes)

        this.deleteClientsDialog = false;
        this.client = {addressId: 0, email: "", lastname: "", name: "", phone: 0};
    }
    async deleteClientMethod(id:number){
        let respuesta;
        await this.clientService.deleteClient(id).toPromise().then((response) => {
            respuesta=response;
        }).catch(e => console.error(e));
        return respuesta;
    }
    async getClientById(id:number){
        let respuesta;
        await this.clientService.getClientById(id).toPromise().then((response) => {
            respuesta=response;
        }).catch(e => console.error(e));
        return respuesta;
    }
    async getAddressById(id:number){
        let respuesta;
        await this.clientService.getAddressById(id).toPromise().then((response) => {
            respuesta=response;
        }).catch(e => console.error(e));
        return respuesta;
    }

    hideDialog() {
        this.clientDialog = false;
        this.submitted = false;
    }

    async saveClient() {
        console.log(this.client);
        await this.updateClient(this.client.clientId);

        //this.client = [...this.client];
        this.clientDialog = false;
        this.client = {addressId: 0, email: "", lastname: "", name: "", phone: 0};
        // this.submitted = true;
        this.listaClientes=[];
        this.listaClientes = await this.getClients();
        console.log(this.listaClientes)
    }
    async updateClient(id){
        let respuesta;
        await this.clientService.updateClient(id,this.client).toPromise().then((response) => {
            respuesta=response;
        }).catch(e => console.error(e));
        return respuesta;
    }
}
