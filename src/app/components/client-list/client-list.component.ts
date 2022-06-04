import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../service/client.service";
import {Client} from "../../api/Client";
import {Product} from "../../api/product";
import {ClientDetails} from "../../api/ClientDetails";

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

    listaClientes:ClientDetails[];
    client:ClientDetails={address: "", clientId: 0, email: "", lastname: "", name: "", phone: 0}
    submitted: boolean;
    clientDialog: boolean;
    deleteClientsDialog: boolean = false;
    selectedClients: ClientDetails[];
    public cols: any[];

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

    }

    async getClients(){
        let respuesta;
        await this.clientService.getClients().toPromise().then((response) => {
            respuesta=response;
        }).catch(e => console.error(e));
        return respuesta;
    }

    openNew() {
        this.client = {address: "", clientId: 0, email: "", lastname: "", name: "", phone: 0};
        this.submitted = false;
        this.clientDialog = true;
    }

    deleteSelectedClients() {
        this.deleteClientsDialog = true;
    }

    editClient(client: ClientDetails) {

    }

    deleteClient(client: ClientDetails) {

    }

    confirmDelete() {

    }
}
